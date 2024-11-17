
export type TempMarker = {
  lat: number
  lng: number
};

export type Cluster = {
  id:         number
  type:       string
  properties: ClusterProperty | ClusterPropertyExtra
  geometry:   ClusterGeometry
};

export type ClusterProperty = {
  category: string
  cluster:  boolean
  siteID:   string
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
