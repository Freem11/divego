export type DiveShop = {
    id:      number;
    orgName: string;
    lat:     number;
    lng:     number;
    diveShopBio: string;
  };
  
export type ItineraryItem = {
    BookingPage: string;
    created_at: string;
    description: string;
    id: number;
    price: string;
    shopID: number;
    siteList: number[];
    startDate: string;
    tripName: string;
};