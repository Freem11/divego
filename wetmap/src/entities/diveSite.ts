export type DiveSiteWithUserName = {
  id:                   number
  name:                 string
  lat:                  number
  lng:                  number
  userid:               string
  region:               string
  username:             string
  created_at:           string
  divesitebio:          string
  newusername:          string
  divesiteprofilephoto: string
  engagement_score?:    number
  siteNumber?:          number
};

export type DiveSiteBasic = {
  id:                number
  name:              string
  lat:               number
  lng:               number
  engagement_score?: number
  siteNumber?:       number
};
