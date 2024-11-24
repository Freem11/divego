import { supabase } from '../supabase';

export const shops = async (GPSBubble) => {
  let lats = GPSBubble[Object.keys(GPSBubble)[0]];
  let lngs = GPSBubble[Object.keys(GPSBubble)[1]];

  let minLat, maxLat, minLng, maxLng;

  if (GPSBubble.maxLat) {
    minLat = GPSBubble.minLat;
    maxLat = GPSBubble.maxLat;
    minLng = GPSBubble.minLng;
    maxLng = GPSBubble.maxLng;
  } else {
    minLat = lats.lo;
    maxLat = lats.hi;
    minLng = lngs.lo;
    maxLng = lngs.hi;
  }


  const { data, error } = await supabase
    .from('shops')
    .select()
    .gte('lat', minLat)
    .gte('lng', minLng)
    .lte('lat', maxLat)
    .lte('lng', maxLng);

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

export const updateDiveShop = async (values) => {
  console.log('updating...', values);
  const { data, error } = await supabase
    .from('shops')
    .update({ diveShopBio: values.bio, diveShopProfilePhoto: values.photo  })
    .eq('id', values.id);

  if (error) {
    console.log('couldn\'t do it 2,', error);
    return [];
  }

  if (data) {
    return data;
  }
};


export const getShopByUserID = async (value) => {
  const { data, error } = await supabase
    .from('shops')
    .select()
    .eq('userId', value);

  if (error) {
    console.log('couldn\'t do it 39,', error);
    return [];
  }

  if (data) {
    return data;
  }
};
