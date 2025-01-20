import { combineComponents } from '../combineComponents';

import AreaPicsContextProvider from './areaPicsContext';
import SearchTextContextProvider from './searchTextContext';
import PullTabContextProvider from './pullTabContext';
import CarrouselTilesContextProvider from './carrouselTilesContext';
import UserProfileContextProvider from './userProfileContext';
import { MapContextProvider } from '../googleMap/mapContextProvider';
import SelectedDiveSiteContextProvider from './selectedDiveSiteContext';
import PictureContextProvider from './pictureContext';
import AnimalContextProvider from './animalContext';
import PinContextProvider from './staticPinContext';
import DiveSitesContextProvider from './diveSitesContext';
import SelectedPictureContextProvider from './selectedPictureContext';
import SelectedShopContextProvider from './selectedShopContext';
import SitesArrayContextProvider from './sitesArrayContext';
import ModalContextProvider from '../reusables/modal/contextProvider';
import MapBoundariesDiveSiteContextProvider from './mapBoundariesDiveSiteContextProvider';
import MapBoundariesDiveShopContextProvider from './mapBoundariesDiveShopContextProvider';
import { MapBoundariesPhotoContextProvider } from './mapBoundariesPhotoContextProvider';

const providers = [
  AreaPicsContextProvider,
  SearchTextContextProvider,
  PullTabContextProvider,
  CarrouselTilesContextProvider,
  UserProfileContextProvider,
  MapContextProvider,
  SelectedDiveSiteContextProvider,
  PictureContextProvider,
  AnimalContextProvider,
  PinContextProvider,
  DiveSitesContextProvider,
  SelectedPictureContextProvider,
  SelectedShopContextProvider,
  SitesArrayContextProvider,
  ModalContextProvider,
  MapBoundariesDiveSiteContextProvider,
  MapBoundariesDiveShopContextProvider,
  MapBoundariesPhotoContextProvider,
];

export const AppContextProvider = combineComponents(...providers);
