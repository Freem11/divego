import anchorIcon from '../../images/mapIcons/AnchorBlue1.png';
import anchorIconGold from '../../images/mapIcons/AnchorGold.png';
import shopIcon from '../../images/mapIcons/DiveCentre24x24.png';
import DiveSite from '../newModals/diveSite/index';
import ShopModal from '../newModals/shopModal/index';
import { getShopByName } from '../../supabaseCalls/shopsSupabaseCalls';
import { ClusterCoordinates, ClusterProperty } from './types';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import { DiveShop } from '../../entities/diveShop';
import { getDiveSiteWithUserName } from '../../supabaseCalls/diveSiteSupabaseCalls';
import { ModalShow } from '../reusables/modal/types';

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

const setupDiveShopModal = async (shopName: string, modalShow: ModalShow, setSelectedShop: (shop: DiveShop) => void) => {
  modalShow(ShopModal, {
    size: 'large',
  });
  const chosenShop = await getShopByName(shopName);
  setSelectedShop(chosenShop[0]);
};

const setupDiveSiteModal = async (diveSiteName: string, latitude: number, longitude: number, modalShow: ModalShow, setSelectedDiveSite: (site: DiveSiteWithUserName) => void) => {
  const cleanedSiteName = diveSiteName.split('~');
  const steName = cleanedSiteName[0]
  const siteRegion = cleanedSiteName[1] === "null" ? null : cleanedSiteName[1]
  modalShow(DiveSite, {
    size: 'large',
  });
  const chosenSite = await getDiveSiteWithUserName({ siteName: steName,region: siteRegion  });
  setSelectedDiveSite(chosenSite[0]);
};

function setupPinConfigs(info: ClusterProperty, coordinates: ClusterCoordinates, modalShow: ModalShow, setSelectedDiveSite: (site: DiveSiteWithUserName) => void, setSelectedShop: (shop: DiveShop) => void) {
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
