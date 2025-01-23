import Supercluster from 'supercluster';
import { DiveSiteBasic } from '../../../entities/diveSite';
import { ClusterProperty, PointFeatureCategory  } from '../types';

export const diveSiteToPointFeature = (diveSite: DiveSiteBasic) => {
  return {
    id:         'divesite-' + diveSite.id,
    type:       'Feature',
    properties: {
      id:       diveSite.id,
      title:    diveSite.name,
      category: PointFeatureCategory.DiveSite,
    },
    geometry: { type: 'Point', coordinates: [diveSite.lng, diveSite.lat] },
  } as Supercluster.PointFeature<ClusterProperty>;
};
