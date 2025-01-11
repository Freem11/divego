const detectOS = (): string => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  // Check for Android
  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // Check for iOS
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return 'iOS';
  }

  // Check for Windows
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  // Check for macOS
  if (/Macintosh/.test(userAgent)) {
    return 'macOS';
  }

  // Check for Windows
  if (/Win/.test(userAgent)) {
    return 'Windows';
  }

  // Check for Linux
  if (/Linux/.test(userAgent)) {
    return 'Linux';
  }

  // Default to "Unknown"
  return 'Unknown';
};

export default detectOS;
