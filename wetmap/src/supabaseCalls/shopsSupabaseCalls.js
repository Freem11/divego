import { supabase } from '../supabase';

// export const getDiveSitesWithUser = async (values) => {
//   const { data, error } = await supabase.rpc('get_divesites_with_username', {
//     max_lat: values.maxLat,
//     min_lat: values.minLat,
//     max_lng: values.maxLng,
//     min_lng: values.minLng,
//     userid:  values.myDiveSites,
//   });

//   if (error) {
//     console.log('couldn\'t do it 27,', error);
//     return [];
//   }

//   if (data) {
//     // console.log(data)
//     return data;
//   }
// };

export const shops = async (GPSBubble) => {
  const { data, error } = await supabase
    .from('shops')
    .select()
    .gte('lat', GPSBubble.minLat)
    .gte('lng', GPSBubble.minLng)
    .lte('lat', GPSBubble.maxLat)
    .lte('lng', GPSBubble.maxLng);

  if (error) {
    console.log('couldn\'t do it 31,', error);
    return ([]);
  }

  if (data) {
    return data;
  }
};

export const getShopByName = async (value) => {
  const { data, error } = await supabase
    .from('shops')
    .select()
    .eq('orgName', value);

  if (error) {
    console.log('couldn\'t do it 32,', error);
    return [];
  }

  if (data) {
    return data;
  }
};
