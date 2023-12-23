
function exifGPSHelper(lat, lng, latRef, lngRef) {

  let lats = "";
  let lngs = "";

  if (lat && lng) {
    if (latRef === "S") {
      lats = 0 - (lat[0] + lat[1] / 60 + lat[2] / 3600);
    } else {
      lats = lat[0] + lat[1] / 60 + lat[2] / 3600;
    }

    if (lngRef === "W") {
      lngs = 0 - lng[0] + lng[1] / 60 + lng[2] / 3600;
    } else {
      lngs = lng[0] + lng[1] / 60 + lng[2] / 3600;
    }

    return [lats, lngs];
  } else {
    return null
  }
}

export { exifGPSHelper };
