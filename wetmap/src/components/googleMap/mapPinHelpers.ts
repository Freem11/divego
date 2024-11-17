import anchorIcon from '../../images/mapIcons/AnchorBlue1.png';
import anchorIconGold from '../../images/mapIcons/AnchorGold.png';
import shopIcon from '../../images/mapIcons/DiveCentre24x24.png';
import DiveSite from '../newModals/diveSite/index';
import ShopModal from '../newModals/shopModal/index';
import { ModalWindowSize } from '../reusables/modal/constants';
import { getShopByName } from '../../supabaseCalls/shopsSupabaseCalls';

function setupClusters(diveSiteData, sitesArray) {
  let points
    = diveSiteData
    && diveSiteData.map(site => ({
      id:         site.id,
      type:       'Feature',
      properties: {
        cluster:  false,
        siteID:   `${site.name}~${site.region}`,
        siteName: `${site.name}`,
        category: sitesArray.includes(site.id)
          ? 'Dive Site Selected'
          : 'Dive Site',
      },
      geometry: { type: 'Point', coordinates: [site.lng, site.lat] },
    }));

  return points;
}

function setupShopClusters(shopData) {
  let points = shopData.map(shop => ({
    id:         shop.id,
    type:       'Feature',
    properties: {
      cluster:  false,
      siteID:   shop.orgName,
      category: 'Shop',
    },
    geometry: { type: 'Point', coordinates: [shop.lng, shop.lat] },
  }));

  return points;
}


const setupDiveShopModal = async (shopName, modalShow, setSelectedShop) => {
  modalShow(ShopModal, {
    size: ModalWindowSize.L,
  });
  const chosenShop = await getShopByName(shopName);
  setSelectedShop(chosenShop);
};

const setupDiveSiteModal = async (diveSiteName, lat, lng, modalShow, selectedDiveSite, setSelectedDiveSite) => {
  modalShow(DiveSite, {
    size: ModalWindowSize.L,
  });
  setSelectedDiveSite({
    ...selectedDiveSite,
    SiteName:  diveSiteName,
    Latitude:  lat,
    Longitude: lng,
  });
};

function setupPinConfigs(info, coordinates, modalShow, selectedDiveSite, setSelectedDiveSite, setSelectedShop) {
  const [longitude, latitude] = coordinates;
  const iconType = info.category === 'Dive Site' ? anchorIcon : info.category === 'Dive Site Selected' ? anchorIconGold : shopIcon;
  const modalSetup = info.category === 'Shop'
    ? () => { setupDiveShopModal(info.siteID, modalShow, setSelectedShop); }
    : () => {
        setupDiveSiteModal(
          info.siteName,
          latitude,
          longitude,
          modalShow,
          selectedDiveSite,
          setSelectedDiveSite,
        );
      };

  return { iconType,  modalSetup };
}

export { setupClusters, setupShopClusters, setupPinConfigs };
