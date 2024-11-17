
export type TempMarker = {
  lat: number
  lng: number
};

export type Cluster = {
  id:         number
  type:       string
  properties: {
    category:    string
    cluster:     boolean
    siteID:      string
    point_count: number
  }
  geometry: {
    coordinates: number[]
    type:        string
  }
};

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
