import { supabase } from '../supabase';

export const getDiveShops = async (values) => {
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
    return data;
  }
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

export const getShopByName = async (value) => {
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

export const insertDocument = async () => {
  console.log('inserting a record');
  const { data, error } = await supabase
    .from('RLS_Test_Playground')
    .insert([
      {
      },
    ]);

  if (error) {
    console.log('couldn\'t do it,', error);
  }

  if (data) {
    console.log(data);
  }
};

export const readAllTestRecords = async () => {
  console.log('returning authorized documents:');
  const { data, error } = await supabase
    .from('RLS_Test_Playground')
    .select();

  if (error) {
    console.log('couldn\'t do it,', error);
  }

  if (data) {
    console.log(data);
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
