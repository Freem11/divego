import Supercluster from 'supercluster';
import { ClusterProperty, PointFeatureCategory  } from '../types';
import { DiveShop } from '../../../entities/diveShop';

export const diveShopToPointFeature = (diveShop: DiveShop) => {
  return {
    id:         'diveshop-' + diveShop.id,
    type:       'Feature',
    properties: {
      id:       diveShop.id,
      title:    diveShop.orgname,
      category: PointFeatureCategory.DiveShop,
    },
    geometry: { type: 'Point', coordinates: [diveShop.lng, diveShop.lat] },
  } as Supercluster.PointFeature<ClusterProperty>;
};
