import { DiveSiteWithUserName } from '../entities/diveSite';
import { GPSBubble } from '../entities/GPSBubble';
import { Pagination } from '../entities/pagination';
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

export const getDiveSitesBasic = async (bubble: GPSBubble) => {
  const { data, error } = await supabase
    .from('diveSites')
    .select('id,lat,lng,name')
    .gte('lat', bubble.minLat)
    .gte('lng', bubble.minLng)
    .lte('lat', bubble.maxLat)
    .lte('lng', bubble.maxLng);

  if (error || !data) {
    console.log('couldn\'t do it,', error);
    return [];
  }

  return data as DiveSiteWithUserName[];
};
export const getDiveSitesWithUser = async (bubble: GPSBubble, filter?: Partial<DiveSiteWithUserName>, pagination?: Pagination) => {
  const builder = supabase.rpc('get_divesites_with_username', {
    max_lat: bubble.maxLat,
    min_lat: bubble.minLat,
    max_lng: bubble.maxLng,
    min_lng: bubble.minLng,
    userid:  filter?.userid ?? '',
  });

  if (pagination?.page) {
    builder.range(pagination.from(), pagination.to());
  }

  const { data, error } = await builder;

  if (error) {
    console.log('couldn\'t do it 27,', error);
    return [];
  }

  if (data) {
    // console.log(data)
    return data;
  }
};

export const getSiteNamesThatFit = async (value: string, limit: number = 10): Promise<DiveSiteWithUserName[]> => {
  if (value === '') {
    return [];
  }

  const { data, error } = await supabase
    .from('diveSites')
    .select()
    .ilike('name', '%' + value + '%')
    .limit(limit);

  if (error || !data) {
    console.log('couldn\'t do it,', error);
    return [];
  }

  return data as DiveSiteWithUserName[];
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

export const getDiveSitesByIDs = async (ids: number[]): Promise<DiveSiteWithUserName[]> => {
  const { data, error } = await supabase
    .from('diveSites')
    .select()
    .in('id', ids);

  if (error || !data) {
    console.log('couldn\'t do it 7,', error);
    return [];
  }

  return data as DiveSiteWithUserName[];
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


export const getDiveSiteById = async (id: string | number) => {
  const { data, error } = await supabase.rpc('get_single_divesite_byid_info_with_username', {
    idnum: id,
  });

  if (error) {
    console.log('couldn\'t do it 7,', error);
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

export const getSingleDiveSite = async (lat: number, lng: number) => {
  const { data, error } = await supabase
    .from('diveSites')
    .select()
    .eq('lat', lat)
    .eq('lng', lng);

  if (error) {
    console.log('couldn\'t do it,', error);
    return [];
  }

  if (data) {
    return data as DiveSiteWithUserName[];
  }
};
