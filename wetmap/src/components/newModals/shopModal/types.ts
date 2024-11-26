export type DiveShop = {
  id:                   number
  orgName:              string
  lat:                  number
  lng:                  number
  diveShopBio:          string
  created_at:           string
  diveShopProfilePhoto: string
  userId:               string
};

export type ItineraryItem = {
  BookingPage: string
  created_at:  string
  description: string
  id:          number
  name:        string
  price:       string
  shopID:      number
  siteList:    number[]
  startDate:   string
  endDate:    string
  tripName:    string
};