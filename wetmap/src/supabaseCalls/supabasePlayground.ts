import { supabase } from '../supabase';

export const insertRecord = async () => {
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

export const selected