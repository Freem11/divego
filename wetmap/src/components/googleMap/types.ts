

export type MapConfiguration = {
  mapTypeId:         string
  clickableIcons:    boolean
  maxZoom:           number
  minZoom:           number
  mapTypeControl:    boolean
  fullscreenControl: boolean
  disableDefaultUI:  boolean
};

export type HeatPointConfiguration = {
  opacity: number
  radius:  number
};

export type MapWithHeatmapProps = {
  map:              google.maps.Map | null
  heatpts:          google.maps.LatLng[] | { location: google.maps.LatLng, weight: number }[]
  mapConfig:        number
  heatpointConfigs: google.maps.visualization.HeatmapLayerOptions
};

export type LatLngObject = {
  lat: number
  lng: number
};

export type SuperclusterInstance = {
  getClusterExpansionZoom(clusterId: number): number
};

export type ClusterInstance = {
  points:  []
  bounds:  google.maps.LatLngBounds
  zoom:    number
  options: { radius: number, maxZoom: number }
};

export type Cluster = {
  id:         number
  type:       string
  properties: ClusterProperty
  geometry:   ClusterGeometry
};

export type ClusterProperty = {
  siteName?:    string
  category:     string
  cluster:      boolean
  siteID:       string
  point_count?: number
};

export type ClusterPropertyExtra = {
  siteName:    string
  category:    string
  cluster:     boolean
  siteID:      string
  point_count: number
};

export type ClusterGeometry = {
  coordinates: ClusterCoordinates
  type:        string
};

export type ClusterCoordinates = number[];

export type HeatPoint = {
  location: google.maps.LatLng
  weight:   number
};

export type HeatData = {
  animal:      string
  created_at:  string
  id:          number
  lat:         number
  lng:         number
  month:       number
  newusername: string | null
  userid:      string
  username:    string | null
  weight:      number
};
