import React, { useState, useRef } from 'react';
import * as piexif from 'piexifjs';
import mediaInfoFactory from 'mediainfo.js';
import mediaInfoWasmUrl from 'mediainfo.js/MediaInfoModule.wasm?url';

// piexifjs 1.0.6 predates EXIF 2.31 — register the timezone tags once so dump() accepts them.
// @types/piexifjs doesn't expose TAGS, hence the cast.
(piexif as any).TAGS.Exif[36881] = { name: 'OffsetTimeOriginal', type: 'Ascii' };
(piexif as any).TAGS.Exif[36882] = { name: 'OffsetTimeDigitized', type: 'Ascii' };

interface CameraMeta {
  make:  string
  model: string
}

// epoch is ms. When isWallClock is true the epoch already encodes the camera's local
// wall-clock time (read it with the getUTC* accessors, add no timezone offset);
// when false it is a true UTC epoch and the timezone offset converts it to wall clock.
interface StartInfo {
  epoch:       number
  isWallClock: boolean
  source:      string
}

const TIMEZONES: { value: number, label: string }[] = [
  { value: -12,  label: 'International Date Line West (UTC-12)' },
  { value: -11,  label: 'Samoa Standard Time (UTC-11)' },
  { value: -10,  label: 'Hawaii-Aleutian Standard Time (UTC-10)' },
  { value: -9.5, label: 'Marquesas Time (UTC-9:30)' },
  { value: -9,   label: 'Alaska Standard Time (UTC-9)' },
  { value: -8,   label: 'Pacific Standard Time (UTC-8)' },
  { value: -7,   label: 'Pacific Daylight/Mountain Standard Time (UTC-7)' },
  { value: -6,   label: 'Mountain Daylight Time (UTC-6)' },
  { value: -5,   label: 'Eastern Standard Time (UTC-5)' },
  { value: -4,   label: 'Atlantic Standard Time (UTC-4)' },
  { value: -3.5, label: 'Newfoundland Time (UTC-3:30)' },
  { value: -3,   label: 'Argentina Time (UTC-3)' },
  { value: -2,   label: 'South Georgia Time (UTC-2)' },
  { value: -1,   label: 'Azores Time (UTC-1)' },
  { value: 0,    label: 'Coordinated Universal Time (UTC+0)' },
  { value: 1,    label: 'Central European Time (UTC+1)' },
  { value: 2,    label: 'Eastern European Time (UTC+2)' },
  { value: 3,    label: 'Moscow Standard Time (UTC+3)' },
  { value: 4,    label: 'Gulf Standard Time (UTC+4)' },
  { value: 5,    label: 'Pakistan Standard Time (UTC+5)' },
  { value: 5.5,  label: 'India Standard Time (UTC+5:30)' },
  { value: 6,    label: 'Bangladesh Standard Time (UTC+6)' },
  { value: 6.5,  label: 'Myanmar/Cocos Time (UTC+6:30)' },
  { value: 7,    label: 'Indochina Time (UTC+7)' },
  { value: 8,    label: 'China Standard Time (UTC+8)' },
  { value: 9,    label: 'Japan Standard Time (UTC+9)' },
  { value: 9.5,  label: 'Australian Central Standard Time (UTC+9:30)' },
  { value: 10,   label: 'Australian Eastern Standard Time (UTC+10)' },
  { value: 11,   label: 'Solomon Island Time (UTC+11)' },
  { value: 12,   label: 'New Zealand Standard Time (UTC+12)' },
  { value: 13,   label: 'Phoenix Island Time (UTC+13)' },
  { value: 14,   label: 'Line Islands Time (UTC+14)' },
];

// MediaInfo emits "UTC 2026-08-16 18:30:00" (old) or "2026-08-16 18:30:00 UTC" (current lib).
const parseMediaInfoDate = (raw: string): number | null => {
  const cleaned = raw.replace(/^UTC\s+/, '').replace(/\s+UTC$/, '').replace(' ', 'T') + 'Z';
  const parsed = Date.parse(cleaned);
  return isNaN(parsed) ? null : parsed;
};

const VideoSandbox: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [containerStart, setContainerStart] = useState<StartInfo | null>(null);
  const [fileMtime, setFileMtime] = useState<number | null>(null);
  const [manualStart, setManualStart] = useState<string>('');
  const [timezoneOffset, setTimezoneOffset] = useState<number>(-new Date().getTimezoneOffset() / 60);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [cameraMeta, setCameraMeta] = useState<CameraMeta>({ make: '', model: '' });

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const parseVideoMetadata = async (file: File) => {
    try {
      const mediainfo = await mediaInfoFactory({
        format:     'object',
        // Serve the WASM bundled with the pinned mediainfo.js version instead of a CDN.
        locateFile: () => mediaInfoWasmUrl,
      });

      const getSize = () => file.size;
      const readChunk = (chunkSize: number, offset: number) =>
        new Promise<Uint8Array>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              resolve(new Uint8Array(e.target.result as ArrayBuffer));
            } else {
              reject(new Error('Read error'));
            }
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize));
        });

      const result = await mediainfo.analyzeData(getSize, readChunk);
      mediainfo.close();

      // Cast generalTrack to allow reading optional Make / Model / extra fields
      const generalTrack = result.media?.track.find(
        t => t['@type'] === 'General',
      ) as Record<string, any> | undefined;
      const extra = generalTrack?.extra as Record<string, any> | undefined;

      setCameraMeta({
        make:  generalTrack?.Make || extra?.com_apple_quicktime_make || '',
        model: generalTrack?.Model || extra?.com_apple_quicktime_model || '',
      });

      // iPhone .mov carries the true local time with UTC offset — the best source.
      const appleDate = extra?.com_apple_quicktime_creationdate;
      if (appleDate && typeof appleDate === 'string') {
        const parsed = Date.parse(appleDate);
        if (!isNaN(parsed)) {
          setContainerStart({ epoch: parsed, isWallClock: false, source: 'phone creation date' });
          const offsetMatch = appleDate.match(/([+-])(\d{2}):?(\d{2})\s*$/);
          if (offsetMatch) {
            const sign = offsetMatch[1] === '-' ? -1 : 1;
            setTimezoneOffset(sign * (Number(offsetMatch[2]) + Number(offsetMatch[3]) / 60));
          }
          return;
        }
      }

      // Action cams (GoPro included) write camera-local wall-clock time into the
      // UTC-defined container field, so treat it as wall clock, not UTC.
      const rawDate = generalTrack?.Encoded_Date || generalTrack?.Tagged_Date;
      if (rawDate && typeof rawDate === 'string') {
        const parsed = parseMediaInfoDate(rawDate);
        if (parsed !== null) {
          setContainerStart({ epoch: parsed, isWallClock: true, source: 'container date (camera clock)' });
        }
      }
    } catch (err) {
      console.warn('Metadata extraction failed, falling back to file modification time:', err);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
      setContainerStart(null);
      setManualStart('');
      setFileMtime(file.lastModified);
      await parseVideoMetadata(file);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  // Manual entry is camera wall-clock time. SD-card mtime marks file close
  // (recording end), so the fallback start is mtime minus the clip length.
  const getStartInfo = (): StartInfo | null => {
    if (manualStart) {
      const parsed = Date.parse(manualStart + 'Z');
      if (!isNaN(parsed)) return { epoch: parsed, isWallClock: true, source: 'manual entry' };
    }
    if (containerStart) return containerStart;
    if (fileMtime !== null) {
      return { epoch: fileMtime - duration * 1000, isWallClock: false, source: 'file modified time − clip length' };
    }
    return null;
  };

  const formatTimestamp = (date: Date) => {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(date.getUTCDate()).padStart(2, '0');
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const mm = String(date.getUTCMinutes()).padStart(2, '0');
    const ss = String(date.getUTCSeconds()).padStart(2, '0');
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  };

  const getWallClockDate = () => {
    const startInfo = getStartInfo();
    if (!startInfo) return new Date();
    const rawEpoch = startInfo.epoch + currentTime * 1000;
    const offsetMs = startInfo.isWallClock ? 0 : timezoneOffset * 60 * 60 * 1000;
    return new Date(rawEpoch + offsetMs);
  };

  const exportFrameWithExif = async () => {
    if (!videoRef.current || getStartInfo() === null) return;

    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise<Blob | null>(resolve =>
        canvas.toBlob(resolve, 'image/jpeg', 0.95),
      );
      if (!blob) throw new Error('Canvas toBlob failed');

      const arrayBuffer = await blob.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      let binaryString = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binaryString += String.fromCharCode(bytes[i]);
      }

      const wallClock = getWallClockDate();
      const exifDate = formatTimestamp(wallClock).replace(/-/g, ':');

      const offsetSign = timezoneOffset >= 0 ? '+' : '-';
      const offsetAbs = Math.abs(timezoneOffset);
      const offsetStr = `${offsetSign}${String(Math.trunc(offsetAbs)).padStart(2, '0')}:${String(Math.round((offsetAbs % 1) * 60)).padStart(2, '0')}`;
      const subsec = String(Math.round((currentTime % 1) * 1000)).padStart(3, '0');

      // Omit Make/Model when unknown — mobile keys per-camera clock-drift profiles
      // on these tags; an absent tag is handled, a wrong one corrupts the profile.
      const zeroth: Record<number, string> = {};
      if (cameraMeta.make.trim()) zeroth[piexif.ImageIFD.Make] = cameraMeta.make.trim();
      if (cameraMeta.model.trim()) zeroth[piexif.ImageIFD.Model] = cameraMeta.model.trim();

      const exifObj = {
        '0th':  zeroth,
        'Exif': {
          [piexif.ExifIFD.DateTimeOriginal]:   exifDate,
          [piexif.ExifIFD.DateTimeDigitized]:  exifDate,
          36881:                               offsetStr, // OffsetTimeOriginal
          36882:                               offsetStr, // OffsetTimeDigitized
          [piexif.ExifIFD.SubSecTimeOriginal]: subsec,
        },
      };

      const exifBytes = piexif.dump(exifObj);
      const binaryWithExifString = piexif.insert(exifBytes, binaryString);

      const finalBuffer = new Uint8Array(binaryWithExifString.length);
      for (let i = 0; i < binaryWithExifString.length; i++) {
        finalBuffer[i] = binaryWithExifString.charCodeAt(i);
      }

      const finalBlob = new Blob([finalBuffer], { type: 'image/jpeg' });
      const url = URL.createObjectURL(finalBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cameraMeta.make.trim() || 'frame'}_${exifDate.replace(/[: ]/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed: ' + err);
    }
  };

  const startInfo = getStartInfo();

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'monospace', backgroundColor: '#121212', color: '#eee', borderRadius: '15px' }}>
      <header style={{ borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '20px' }}>
        <h2 style={{ color: '#00ccff', margin: 0 }}>GoPro Telemetry & Frame Exporter</h2>
      </header>

      {!videoSrc
        ? (
            <div style={{ padding: '80px', border: '2px dashed #444', textAlign: 'center' }}>
              <input type="file" accept="video/*" onChange={handleFileUpload} />
            </div>
          )
        : (
            <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
              <div style={{ flex: '2' }}>
                <video ref={videoRef} src={videoSrc} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} controls style={{ width: '100%', borderRadius: '10px' }} />
                <input type="range" min="0" max={duration} step="0.01" value={currentTime} onChange={(e) => { if (videoRef.current) videoRef.current.currentTime = parseFloat(e.target.value); }} style={{ width: '100%', marginTop: '15px' }} />
              </div>

              <div style={{ flex: '1', backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px' }}>
                <h3>Control Panel</h3>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ color: '#aaa' }}>Camera Make / Model (blank = omit from EXIF):</label>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                    <input
                      type="text"
                      placeholder="Make"
                      value={cameraMeta.make}
                      onChange={e => setCameraMeta({ ...cameraMeta, make: e.target.value })}
                      style={{ width: '50%', padding: '8px', backgroundColor: '#333', color: '#fff', border: 'none' }}
                    />
                    <input
                      type="text"
                      placeholder="Model"
                      value={cameraMeta.model}
                      onChange={e => setCameraMeta({ ...cameraMeta, model: e.target.value })}
                      style={{ width: '50%', padding: '8px', backgroundColor: '#333', color: '#fff', border: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ color: '#aaa' }}>
                    Recording start
                    {startInfo ? ` — ${startInfo.source}` : ''}
                    :
                  </label>
                  <input
                    type="datetime-local"
                    step="1"
                    value={manualStart}
                    onChange={e => setManualStart(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#333', color: '#fff', border: 'none' }}
                  />
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>Set only to override — enter the camera&apos;s local time.</span>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#aaa' }}>Timezone Offset:</label>
                  <select
                    value={timezoneOffset}
                    onChange={e => setTimezoneOffset(Number(e.target.value))}
                    style={{ width: '100%', padding: '10px', marginTop: '5px', backgroundColor: '#333', color: '#fff', border: 'none' }}
                  >
                    {TIMEZONES.map(tz => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p style={{ color: '#aaa' }}>Frame Timestamp:</p>
                <div style={{ fontSize: '1.2rem', color: '#00ccff', marginBottom: '20px' }}>{formatTimestamp(getWallClockDate())}</div>
                <button onClick={exportFrameWithExif} style={{ width: '100%', padding: '15px', backgroundColor: '#00ccff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>📸 EXPORT JPEG</button>
              </div>
            </div>
          )}
    </div>
  );
};

export default VideoSandbox;
