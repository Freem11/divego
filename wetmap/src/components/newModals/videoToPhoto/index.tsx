import React, { useState, useRef } from 'react';
import * as piexif from 'piexifjs';

const VideoSandbox: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setStartTime(new Date(file.lastModified));
      setVideoSrc(URL.createObjectURL(file));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      setDuration(videoDuration);
      if (startTime) {
        const adjustedStart = new Date(startTime.getTime() - videoDuration * 1000);
        setStartTime(adjustedStart);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTimestamp = (date: Date | null) => {
    if (!date) return '---';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const t = date.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${y}-${m}-${d} ${t}`;
  };

  const getWallClockDate = () => {
    if (!startTime) return new Date();
    return new Date(startTime.getTime() + currentTime * 1000);
  };

  const exportFrameWithExif = () => {
    if (!videoRef.current || !startTime) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.95);

    const wallClock = getWallClockDate();
    const exifDate = formatTimestamp(wallClock).replace(/-/g, ':');

    // EXIF Structure
    const zeroth: any = {};
    const exif: any = {};

    // Standard Camera Info
    zeroth[piexif.ImageIFD.Make] = 'GoPro';
    zeroth[piexif.ImageIFD.Model] = 'Hero 7 Black'; // Added specific model info
    zeroth[piexif.ImageIFD.Software] = 'React Frame Exporter';

    // Timing Info
    exif[piexif.ExifIFD.DateTimeOriginal] = exifDate;
    exif[piexif.ExifIFD.DateTimeDigitized] = exifDate;

    const exifObj = { '0th': zeroth, 'Exif': exif };
    const exifBytes = piexif.dump(exifObj);

    const newJpeg = piexif.insert(exifBytes, jpegDataUrl);

    const link = document.createElement('a');
    link.href = newJpeg;
    link.download = `GoPro_Hero7_${exifDate.replace(/[: ]/g, '_')}.jpg`;
    link.click();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'monospace', backgroundColor: '#121212', color: '#eee', borderRadius: '15px', minHeight: '500px' }}>
      <header style={{ borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '20px' }}>
        <h2 style={{ color: '#00ccff', margin: 0 }}>GoPro Telemetry & Frame Exporter</h2>
      </header>

      {!videoSrc
        ? (
            <div style={{ padding: '80px 20px', border: '2px dashed #444', borderRadius: '10px', textAlign: 'center', backgroundColor: '#1a1a1a' }}>
              <p style={{ color: '#888', marginBottom: '20px' }}>Upload your GoPro .MP4 from Desktop or T7</p>
              <input type="file" accept="video/*" onChange={handleFileUpload} style={{ color: '#00ccff' }} />
            </div>
          )
        : (
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              <div style={{ flex: '2', minWidth: '450px' }}>
                <video ref={videoRef} src={videoSrc} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} controls style={{ width: '100%', borderRadius: '12px', backgroundColor: '#000' }} />
                <div style={{ marginTop: '20px', backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px' }}>
                  <input type="range" min="0" max={duration || 0} step="0.01" value={currentTime} onChange={handleScrub} style={{ width: '100%', accentColor: '#00ccff' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: '#666', fontSize: '0.9rem' }}>
                    <span>
                      Index:
                      {currentTime.toFixed(2)}
                      s
                    </span>
                    <span>
                      Total:
                      {duration.toFixed(2)}
                      s
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ flex: '1', minWidth: '350px', backgroundColor: '#1e1e1e', padding: '25px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '25px', border: '1px solid #333' }}>
                <section>
                  <label style={{ color: '#555', fontSize: '0.7rem', letterSpacing: '1.5px', fontWeight: 'bold' }}>HARDWARE INFO</label>
                  <div style={{ fontSize: '1.1rem', marginTop: '5px', color: '#bbb' }}>GoPro Hero 7 Black</div>
                </section>

                <section style={{ backgroundColor: '#121212', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #00ccff' }}>
                  <label style={{ color: '#00ccff', fontSize: '0.7rem', letterSpacing: '1.5px', fontWeight: 'bold' }}>CURRENT FRAME TIMESTAMP</label>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '8px', color: '#fff' }}>
                    {formatTimestamp(getWallClockDate())}
                  </div>
                </section>

                <button onClick={exportFrameWithExif} style={{ padding: '16px', backgroundColor: '#00ccff', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                  📸 EXPORT JPEG WITH EXIF
                </button>

                <button onClick={() => setVideoSrc(null)} style={{ padding: '10px', backgroundColor: 'transparent', color: '#555', border: '1px solid #333', borderRadius: '6px', cursor: 'pointer' }}>
                  Clear Session
                </button>
              </div>
            </div>
          )}
    </div>
  );
};

export default VideoSandbox;
