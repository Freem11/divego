 function setupClusters(diveSiteData, sitesArray) {

    let points = diveSiteData && diveSiteData.map((site) => ({
        type: "Feature",
        properties: {
          cluster: false,
          siteID: site.name,
          category: sitesArray.includes(site.id) ? "Dive Site Selected" : "Dive Site",
        },
        geometry: { type: "Point", coordinates: [site.lng, site.lat] },
      }));

    return points;
  }

  function setupShopClusters(shopData) {
    let points = shopData.map((shop) => ({
      type: "Feature",
      properties: {
        cluster: false,
        siteID: shop.orgName,
        category: "Shop",
      },
      geometry: { type: "Point", coordinates: [shop.lng, shop.lat] },
    }));
  
    return points;
  }

export { setupClusters, setupShopClusters };