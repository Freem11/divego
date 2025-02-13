import { GPSBubble } from '../entities/GPSBubble';
import { Pagination } from '../entities/pagination';
import { Animal, Photo } from '../entities/photos';
import { supabase } from '../supabase';

// not in use - remove
// export const getAnimalNames = async () => {
//   const { data, error } = await supabase.from('photos').select('label');

//   if (error) {
//     console.log('couldn\'t do it,', error);
//     return [];
//   }

//   if (data) {
//     return data;
//   }
// };

// not in use - remove
// export const insertphoto = async (values, monthID) => {
//   const { data, error } = await supabase.from('photos').insert([
//     {
//       photoFile: values.photoFile,
//       label:     values.label,
//       dateTaken: values.dateTaken,
//       latitude:  values.latitude,
//       longitude: values.longitude,
//       month:     monthID,
//       UserID:    values.UserID,
//     },
//   ]);

//   if (error) {
//     console.log('couldn\'t do it,', error);
//   }

//   if (data) {
//     console.log(data);
//   }
// };

export const getAnimalNamesThatFit = async (value: string) => {
  if (value === '') {
    return [];
  }

  const { data, error } = await supabase.rpc('get_unique_photo')
    .ilike('label', '%' + value + '%');

  if (error) {
    console.log('couldn\'t do it,', error);
    return [];
  }

  if (data) {
    return data;
  }
};

// not in use - remove
// export const getPhotosforAnchor = async (value) => {
//   const { data, error } = await supabase
//     .from('photos')
//     .select()
//     .ilike('label', '%' + value.animalVal + '%')
//     .gte('latitude', value.minLat)
//     .gte('longitude', value.minLng)
//     .lte('latitude', value.maxLat)
//     .lte('longitude', value.maxLng);

//   if (error) {
//     console.log('couldn\'t do it,', error);
//     return [];
//   }

//   if (data) {
//     return data;
//   }
// };

// not in use - remove
// export const getAnimalMultiSelect = async (text) => {
//   const { data, error } = await supabase
//     .from('photos')
//     .select('id, label')
//     .ilike('label', '%' + text + '%')
//     .limit(10);

//   if (error) {
//     console.log('couldn\'t do it,', error);
//     return [];
//   }

//   if (data) {
//     return data;
//   }
// };

export const getAnimalsInBubble = async (bubble: GPSBubble, filter?: Partial<Photo>, pagination?: Pagination) => {
  const builder = supabase.rpc('get_unique_photo_in_bounds', {
    max_lat: bubble.maxLat,
    min_lat: bubble.minLat,
    max_lng: bubble.maxLng,
    min_lng: bubble.minLng,
  });

  if (filter?.label) {
    builder.ilike('label', '%' + filter.label + '%');
  }

  builder.order('times_seen', { ascending: false });

  if (pagination?.page) {
    builder.range(pagination.from(), pagination.to());
  }

  const { data, error } = await builder;
  if (error) {
    console.log('couldn\'t do it,', error);
    return [];
  }

  if (data) {
    return data as Animal[];
  }
  return [];
};

// not in use - remove
// export const getPhotosWithUser = async (values) => {
//   const { data, error } = await supabase.rpc('get_photos_with_user', {
//     animals:         values.animalMultiSelection,
//     max_lat:         values.maxLat,
//     min_lat:         values.minLat,
//     max_lng:         values.maxLng,
//     min_lng:         values.minLng,
//     userid:          values.myCreatures,
//     connecteduserid: values.userId,
//   });

//   if (error) {
//     console.log('couldn\'t do it 27,', error);
//     return [];
//   }

//   if (data) {
//     return data;
//   }
// };

// not in use - remove
// export const getPhotosWithUserEmpty = async (values) => {
//   const { data, error } = await supabase.rpc('get_photos_with_username', {
//     max_lat:         values.maxLat,
//     min_lat:         values.minLat,
//     max_lng:         values.maxLng,
//     min_lng:         values.minLng,
//     userid:          values.myCreatures,
//     connecteduserid: values.userId,
//   });

//   if (error) {
//     console.log('couldn\'t do it 27,', error);
//     return [];
//   }

//   if (data) {
//     return data;
//   }
// };

export const getHistoData = async (values) => {
  if (values.animals) {
    const { data, error } = await supabase.rpc('histogram3', {
      animals: values.animals,
      max_lat: values.maxLat,
      min_lat: values.minLat,
      max_lng: values.maxLng,
      min_lng: values.minLng,
    });

    if (error) {
      console.log('couldn\'t do it,', error);
      return [];
    }

    if (data) {
      return data;
    }
  }
};

// not in use - remove
// export const getRecentPhotos = async (today) => {
//   const { data, error } = await supabase.rpc('three_randomz');

//   if (error) {
//     console.log('couldn\'t do it 28,', error);
//     return [];
//   }

//   if (data) {
//     return data;
//   }
// };

export const getMostRecentPhoto = async () => {
  const { data, error } = await supabase.rpc('maximum_value');

  if (error) {
    console.log('couldn\'t do it 29,', error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const getPhotosByDiveSiteWithExtra = async (values) => {
  const {
    data,
    error,
  } = await supabase.rpc('get_photos_for_divesite_with_socials_groupby_date', {
    lat:             values.lat,
    lng:             values.lng,
    connecteduserid: values.userId,
  });

  if (error) {
    console.error('couldn\'t do it 30,', error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const getPhotosByUserWithExtra = async (userId: string, connectedUserId: string) => {
  const response = await supabase.rpc('get_photos_by_userid_groupby_divesite_date', {
    userid:          userId,
    connecteduserid: connectedUserId,
  });

  if (response.error) {
    console.error('couldn\'t do it 31,', response.error);
  }

  return response;
};
