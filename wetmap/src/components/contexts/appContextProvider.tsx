import { combineComponents } from '../combineComponents';

import AreaPicsContextProvider from './areaPicsContext';
import SearchTextContextProvider from './searchTextContext';
import PullTabContextProvider from './pullTabContext';
import CarrouselTilesContextProvider from './carrouselTilesContext';
import ModalSelectContextProvider from './modalSelectContext';
import UserProfileContextProvider from './userProfileContext';
import HeatPointsContextProvider from './heatPointsContext';
import MapBoundsContextProvider from './mapBoundariesContext';
import SelectedDiveSiteContextProvider from './selectedDiveSiteContext';
import DiveSpotContextProvider from './diveSpotContext';
import PinSpotContextProvider from './pinSpotContext';
import PictureContextProvider from './pictureContext';
import SliderContextProvider from './sliderContext';
import AnimalContextProvider from './animalContext';
import ZoomContextProvider from './mapZoomContext';
import PinContextProvider from './staticPinContext';
import DiveSitesContextProvider from './diveSitesContext';
import SelectedPictureContextProvider from './selectedPictureContext';
import SelectedShopContextProvider from './selectedShopContext';
import ZoomHelperContextProvider from './zoomHelperContext';
import SitesArrayContextProvider from './sitesArrayContext';
import ModalContextProvider from './modalContextProvider';
import MapConfigContextProvider from './mapConfigContext';

const providers = [
  AreaPicsContextProvider,
  SearchTextContextProvider,
  PullTabContextProvider,
  CarrouselTilesContextProvider,
  ModalSelectContextProvider,
  UserProfileContextProvider,
  HeatPointsContextProvider,
  MapBoundsContextProvider,
  SelectedDiveSiteContextProvider,
  DiveSpotContextProvider,
  PinSpotContextProvider,
  PictureContextProvider,
  SliderContextProvider,
  AnimalContextProvider,
  ZoomContextProvider,
  PinContextProvider,
  DiveSitesContextProvider,
  SelectedPictureContextProvider,
  SelectedShopContextProvider,
  ZoomHelperContextProvider,
  SitesArrayContextProvider,
  ModalContextProvider,
  MapConfigContextProvider,
];

export const AppContextProvider = combineComponents(...providers);
