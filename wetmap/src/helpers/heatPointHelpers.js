
function scrapeMonthNumber(dateValue) {
  return dateValue.slice(5, 7);
}

function formatHeatVals(heatValues) {
  let newArr = [];
  heatValues
  && heatValues.forEach((heatPoint) => {
    let newpt = {
      location: new google.maps.LatLng(heatPoint.lat, heatPoint.lng),
      weight:   heatPoint.weight,
    };
    newArr.push(newpt);
  });

  return newArr;
}

export { scrapeMonthNumber, formatHeatVals };
