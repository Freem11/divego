import { DiveShop } from '../entities/diveShop';
import { GPSBubble } from '../entities/GPSBubble';
import { supabase } from '../supabase';

export const getDiveShops = async (values: GPSBubble) => {
  const { data, error } = await supabase.rpc('get_diveshops', {
    max_lat: values.maxLat,
    min_lat: values.minLat,
    max_lng: values.maxLng,
    min_lng: values.minLng,
  });

  if (error) {
    console.log('couldn\'t do it 27,', error);
    return [];
  }

  if (data) {
    // console.log(data);
    return data as DiveShop[];
  }
  return [];
};

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

export const getShopByName = async (value: string) => {
  const { data, error } = await supabase.rpc('get_diveshops_byname', {
    orgname: value,
  });

  if (error) {
    console.log('couldn\'t do it 32,', error);
    return [];
  }

  if (data) {
    // console.log(data);
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


export const getShopByUserID = async (value: string) => {
  const { data, error } = await supabase
    .from('shops')
    .select()
    .eq('userId', value);

  if (error) {
    console.log('couldn\'t do it 39,', error);
    return [];
  }

  if (data) {
    return data as DiveShop[];
  }
};


export const getDiveShopById = async (id: number) => {
  const { data, error } = await supabase
    .from('shops')
    .select()
    .eq('id', id);

  if (error) {
    console.log('couldn\'t do it 39,', error);
  }

  if (data && data.length > 0) {
    return {
      id:                   data[0].id,
      orgname:              data[0].orgName,
      lat:                  data[0].lat,
      lng:                  data[0].lng,
      userId:               data[0].userId,
      created_at:           data[0].created_at,
      diveshopbio:          data[0].diveShopBio,
      diveshopprofilephoto: data[0].diveShopProfilePhoto,
    } as DiveShop;
  }

  return null;
};
