import anchorIcon from '../../images/mapIcons/AnchorBlue1.png';
import anchorIconGold from '../../images/mapIcons/AnchorGold.png';
import shopIcon from '../../images/mapIcons/DiveCentre24x24.png';
import DiveSite from '../newModals/diveSite/index';
import ShopModal from '../newModals/shopModal/index';
import { ModalWindowSize } from '../reusables/modal/constants';
import { getShopByName } from '../../supabaseCalls/shopsSupabaseCalls';
import { ClusterCoordinates, ClusterProperty } from './types';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import { DiveShop } from '../../entities/diveShop';
import { getDiveSiteWithUserName } from '../../supabaseCalls/diveSiteSupabaseCalls';

function setupClusters(diveSiteData: DiveSiteWithUserName[], sitesArray: number[]) {
  const points
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

function setupShopClusters(shopData: DiveShop[]) {
  const points = shopData.map(shop => ({
    id:         shop.id,
    type:       'Feature',
    properties: {
      cluster:  false,
      siteID:   shop.orgname,
      category: 'Shop',
    },
    geometry: { type: 'Point', coordinates: [shop.lng, shop.lat] },
  }));

  return points;
}

const setupDiveShopModal = async (shopName: string, modalShow, setSelectedShop: (shop: DiveShop) => void) => {
  modalShow(ShopModal, {
    size: ModalWindowSize.L,
  });
  const chosenShop = await getShopByName(shopName);
  setSelectedShop(chosenShop[0]);
};

const setupDiveSiteModal = async (diveSiteName: string, latitude: number, longitude: number, modalShow, setSelectedDiveSite: (site: DiveSiteWithUserName) => void) => {
  const cleanedSiteName = diveSiteName.split('~');
  modalShow(DiveSite, {
    size: ModalWindowSize.L,
  });
  const chosenSite = await getDiveSiteWithUserName({ siteName: cleanedSiteName[0], lat: latitude, lng: longitude });
  setSelectedDiveSite(chosenSite[0]);
};

function setupPinConfigs(info: ClusterProperty, coordinates: ClusterCoordinates, modalShow, setSelectedDiveSite: (site: DiveSiteWithUserName) => void, setSelectedShop: (shop: DiveShop) => void) {
  const [longitude, latitude] = coordinates;
  const iconType = info.category === 'Dive Site' ? anchorIcon : info.category === 'Dive Site Selected' ? anchorIconGold : shopIcon;
  const modalSetup = info.category === 'Shop'
    ? () => { setupDiveShopModal(info.siteID, modalShow, setSelectedShop); }
    : () => {
          setupDiveSiteModal(
            info.siteID,
            latitude,
            longitude,
            modalShow,
            setSelectedDiveSite,
          );
    
      };

  return { iconType,  modalSetup };
}

export { setupClusters, setupShopClusters, setupPinConfigs };
