
// import React, { useState, useRef } from 'react';
// import * as piexif from 'piexifjs';

// const VideoSandbox: React.FC = () => {
//   const [videoSrc, setVideoSrc] = useState<string | null>(null);
//   const [startTime, setStartTime] = useState<Date | null>(null);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event?.target?.files?.[0];
//     if (file) {
//       setStartTime(new Date(file.lastModified));
//       setVideoSrc(URL.createObjectURL(file));
//     }
//   };

//   const handleLoadedMetadata = () => {
//     if (videoRef.current) setDuration(videoRef.current.duration);
//   };

//   const handleTimeUpdate = () => {
//     if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
//   };

//   const formatTimestamp = (date: Date | null) => {
//     if (!date) return '---';
//     const y = date.getFullYear();
//     const m = String(date.getMonth() + 1).padStart(2, '0');
//     const d = String(date.getDate()).padStart(2, '0');
//     const t = date.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
//     return `${y}-${m}-${d} ${t}`;
//   };

//   const getWallClockDate = () => {
//     if (!startTime) return new Date();
//     return new Date(startTime.getTime() + currentTime * 1000);
//   };

//   const exportFrameWithExif = async () => {
//     if (!videoRef.current || !startTime) return;

//     try {
//       const video = videoRef.current;
//       const canvas = document.createElement('canvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const ctx = canvas.getContext('2d');
//       if (!ctx) return;
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//       // 1. Get Blob
//       const blob = await new Promise<Blob | null>(resolve =>
//         canvas.toBlob(resolve, 'image/jpeg', 0.95),
//       );
//       if (!blob) throw new Error('Canvas toBlob failed');

//       // 2. Convert Blob to Binary String (This is what piexif.insert requires)
//       const arrayBuffer = await blob.arrayBuffer();
//       const bytes = new Uint8Array(arrayBuffer);
//       let binaryString = '';
//       for (let i = 0; i < bytes.byteLength; i++) {
//         binaryString += String.fromCharCode(bytes[i]);
//       }

//       // 3. Prepare EXIF
//       const wallClock = getWallClockDate();
//       const exifDate = formatTimestamp(wallClock).replace(/-/g, ':');
//       const exifObj = {
//         '0th':  { [piexif.ImageIFD.Make]: 'GoPro', [piexif.ImageIFD.Model]: 'Hero 7 Black' },
//         'Exif': { [piexif.ExifIFD.DateTimeOriginal]: exifDate, [piexif.ExifIFD.DateTimeDigitized]: exifDate },
//       };

//       // 4. Inject into the binary string
//       const exifBytes = piexif.dump(exifObj);
//       const binaryWithExifString = piexif.insert(exifBytes, binaryString);

//       // 5. Convert back to Uint8Array for the final Blob
//       const finalBuffer = new Uint8Array(binaryWithExifString.length);
//       for (let i = 0; i < binaryWithExifString.length; i++) {
//         finalBuffer[i] = binaryWithExifString.charCodeAt(i);
//       }

//       // 6. Download
//       const finalBlob = new Blob([finalBuffer], { type: 'image/jpeg' });
//       const url = URL.createObjectURL(finalBlob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `GoPro_${exifDate.replace(/[: ]/g, '_')}.jpg`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('Export failed:', err);
//       alert('Export failed: ' + err);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'monospace', backgroundColor: '#121212', color: '#eee', borderRadius: '15px' }}>
//       <header style={{ borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '20px' }}>
//         <h2 style={{ color: '#00ccff', margin: 0 }}>GoPro Telemetry & Frame Exporter</h2>
//       </header>

//       {!videoSrc
//         ? (
//             <div style={{ padding: '80px', border: '2px dashed #444', textAlign: 'center' }}>
//               <input type="file" accept="video/*" onChange={handleFileUpload} />
//             </div>
//           )
//         : (
//             <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
//               <div style={{ flex: '2' }}>
//                 <video ref={videoRef} src={videoSrc} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} controls style={{ width: '100%', borderRadius: '10px' }} />
//                 <input type="range" min="0" max={duration} value={currentTime} onChange={(e) => { if (videoRef.current) videoRef.current.currentTime = parseFloat(e.target.value); }} style={{ width: '100%', marginTop: '15px' }} />
//               </div>

//               <div style={{ flex: '1', backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px' }}>
//                 <h3>Control Panel</h3>
//                 <p style={{ color: '#aaa' }}>Timestamp:</p>
//                 <div style={{ fontSize: '1.2rem', color: '#00ccff', marginBottom: '20px' }}>{formatTimestamp(getWallClockDate())}</div>
//                 <button onClick={exportFrameWithExif} style={{ width: '100%', padding: '15px', backgroundColor: '#00ccff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>📸 EXPORT JPEG</button>
//               </div>
//             </div>
//           )}
//     </div>
//   );
// };

// export default VideoSandbox;

import React, { useState, useRef } from 'react';
import * as piexif from 'piexifjs';

const VideoSandbox: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timezoneOffset, setTimezoneOffset] = useState<number>(-7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const timezoneMap: { [key: number]: string } = {
    '-12': 'International Date Line West (UTC-12)',
    '-11': 'Samoa Standard Time (UTC-11)',
    '-10': 'Hawaii-Aleutian Standard Time (UTC-10)',
    '-9':  'Alaska Standard Time (UTC-9)',
    '-8':  'Pacific Standard Time (UTC-8)',
    '-7':  'Pacific Daylight/Mountain Standard Time (UTC-7)',
    '-6':  'Mountain Daylight Time (UTC-6)',
    '-5':  'Eastern Standard Time (UTC-5)',
    '-4':  'Atlantic Standard Time (UTC-4)',
    '-3':  'Argentina Time (UTC-3)',
    '-2':  'South Georgia Time (UTC-2)',
    '-1':  'Azores Time (UTC-1)',
    '0':   'Coordinated Universal Time (UTC+0)',
    '1':   'Central European Time (UTC+1)',
    '2':   'Eastern European Time (UTC+2)',
    '3':   'Moscow Standard Time (UTC+3)',
    '4':   'Gulf Standard Time (UTC+4)',
    '5':   'Pakistan Standard Time (UTC+5)',
    '6':   'Bangladesh Standard Time (UTC+6)',
    '7':   'Indochina Time (UTC+7)',
    '8':   'China Standard Time (UTC+8)',
    '9':   'Japan Standard Time (UTC+9)',
    '10':  'Australian Eastern Standard Time (UTC+10)',
    '11':  'Solomon Island Time (UTC+11)',
    '12':  'New Zealand Standard Time (UTC+12)',
    '13':  'Phoenix Island Time (UTC+13)',
    '14':  'Line Islands Time (UTC+14)',
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setStartTime(file.lastModified);
      setVideoSrc(URL.createObjectURL(file));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
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
    if (startTime === null) return new Date();
    const rawEpoch = startTime + currentTime * 1000;
    const offsetMs = timezoneOffset * 60 * 60 * 1000;
    return new Date(rawEpoch + offsetMs);
  };

  const exportFrameWithExif = async () => {
    if (!videoRef.current || startTime === null) return;

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
      const exifObj = {
        '0th':  { [piexif.ImageIFD.Make]: 'GoPro', [piexif.ImageIFD.Model]: 'Hero 7 Black' },
        'Exif': { [piexif.ExifIFD.DateTimeOriginal]: exifDate, [piexif.ExifIFD.DateTimeDigitized]: exifDate },
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
      link.download = `GoPro_${exifDate.replace(/[: ]/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed: ' + err);
    }
  };

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
                <input type="range" min="0" max={duration} value={currentTime} onChange={(e) => { if (videoRef.current) videoRef.current.currentTime = parseFloat(e.target.value); }} style={{ width: '100%', marginTop: '15px' }} />
              </div>

              <div style={{ flex: '1', backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px' }}>
                <h3>Control Panel</h3>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#aaa' }}>Timezone Offset:</label>
                  <select
                    value={timezoneOffset}
                    onChange={e => setTimezoneOffset(Number(e.target.value))}
                    style={{ width: '100%', padding: '10px', marginTop: '5px', backgroundColor: '#333', color: '#fff', border: 'none' }}
                  >
                    {Object.entries(timezoneMap).map(([offset, label]) => (
                      <option key={offset} value={offset}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <p style={{ color: '#aaa' }}>Timestamp:</p>
                <div style={{ fontSize: '1.2rem', color: '#00ccff', marginBottom: '20px' }}>{formatTimestamp(getWallClockDate())}</div>
                <button onClick={exportFrameWithExif} style={{ width: '100%', padding: '15px', backgroundColor: '#00ccff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>📸 EXPORT JPEG</button>
              </div>
            </div>
          )}
    </div>
  );
};

export default VideoSandbox;
