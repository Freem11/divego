import { PhotoWaits } from '../entities/photoWaits';
import { supabase } from '../supabase';

const TABLE_NAME = 'photoWait';
export const photoWaits = async () => {
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

export const insertPhotoWaits = async (values: Omit<PhotoWaits, 'id' | 'created_at' | 'userName'>) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([values]);

  if (error) {
    console.log('couldn\'t do it,', error);
  }

  if (data) {
    console.log(data);
  }

  return { data, error };
};

export const grabPhotoWaitById = async (id: string) => {
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

export const deletePhotoWait = async (id: string) => {
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
