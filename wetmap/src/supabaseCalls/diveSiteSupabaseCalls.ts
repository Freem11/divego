import { DiveSiteWithUserName } from '../entities/diveSite';
import { supabase } from '../supabase';

export const diveSites = async () => {
  const { data, error } = await supabase.from('diveSites').select();

  if (error) {
    console.log('couldn\'t do it,', error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const getDiveSitesWithUser = async (values) => {
  const { data, error } = await supabase.rpc('get_divesites_with_username', {
    max_lat: values.maxLat,
    min_lat: values.minLat,
    max_lng: values.maxLng,
    min_lng: values.minLng,
    userid:  values.myDiveSites,
  });

  if (error) {
    console.log('couldn\'t do it 27,', error);
    return [];
  }

  if (data) {
    // console.log(data)
    return data;
  }
};

export const getSiteNamesThatFit = async (value) => {
  if (value === '') {
    return [];
  }

  const { data, error } = await supabase
    .from('diveSites')
    .select()
    .ilike('name', '%' + value + '%');

  if (error) {
    console.log('couldn\'t do it,', error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const insertDiveSite = async (values) => {
  const { data, error } = await supabase.from('diveSites').insert([
    {
      name:   values.name,
      lat:    values.lat,
      lng:    values.lng,
      UserID: values.UserID,
    },
  ]);

  if (error) {
    console.log('couldn\'t do it,', error);
  }

  if (data) {
    console.log(data);
  }
};

export const getDiveSiteByName = async (value) => {
  const { data, error } = await supabase
    .from('diveSites')
    .select()
    .eq('name', value);

  if (error) {
    console.log('couldn\'t do it 7,', error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const getDiveSiteWithUserName = async (values: { siteName: string, region: string | null }) => {
  const { data, error } = await supabase.rpc('get_single_divesite_info_with_username', {
    sitename: values.siteName,
    region:   values.region,
  });

  if (error) {
    console.log('couldn\'t do it 7,', error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const getDiveSitesByIDs = async (valueArray) => {
  const Q1 = valueArray.substring(1, valueArray.length);
  const Q2 = Q1.substring(Q1.length - 1, 0);

  const { data, error } = await supabase
    .from('diveSites')
    .select()
    .or(`id.in.(${Q2})`);

  if (error) {
    console.log('couldn\'t do it 7,', error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const getSingleDiveSiteByNameAndRegion = async (values: { name: string, region: string | null }) => {
  const query = supabase
    .from('diveSites')
    .select('*')
    .eq('name', values.name);

  if (values.region !== null) {
    query.eq('region', values.region);
  }

  const { data, error } = await query;

  if (error) {
    console.log('couldn\'t do it 27,', error);
    return [];
  }

  if (data) {
    return data;
  }
};


export const updateDiveSite = async (values) => {
  console.log('updating...', values);
  const { data, error } = await supabase
    .from('diveSites')
    .update({ diveSiteBio: values.bio, diveSiteProfilePhoto: values.photo  })
    .eq('id', values.id);

  if (error) {
    console.log('couldn\'t do it 2,', error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const getDiveSitesforMapArea = async (value) => {
  const { data, error } = await supabase
    .from('diveSites')
    .select()
    .gte('lat', value.minLat)
    .gte('lng', value.minLng)
    .lte('lat', value.maxLat)
    .lte('lng', value.maxLng);

  if (error) {
    console.log('couldn\'t do it,', error);
    return [];
  }

  if (data) {
    return data;
  }
};
