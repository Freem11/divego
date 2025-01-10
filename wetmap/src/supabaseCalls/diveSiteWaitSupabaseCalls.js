import { supabase } from '../supabase';

const TABLE_NAME = 'diveSiteWait';

export const diveSiteWaits = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select();

  if (error) {
    console.log('couldn\'t do it,', error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const insertDiveSiteWaits = async (values) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([
      {
        name:   values.Site,
        lat:    values.Latitude,
        lng:    values.Longitude,
        UserID: values.UserID,
      },
    ]);

  if (error) {
    console.log('couldn\'t do it,', error);
  }

  return { data, error };
};

export const grabDiveSiteWaitById = async (id) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select()
    .eq('id', id);

  if (error) {
    console.log('couldn\'t do it,', error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const deleteDiveSiteWait = async (id) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);

  if (error) {
    console.log('couldn\'t do it,', error);
    return [];
  }

  if (data) {
    console.log(data);
  }
};
