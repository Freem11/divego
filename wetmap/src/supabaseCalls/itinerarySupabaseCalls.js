import { supabase } from '../supabase';

export const itineraries = async (IdNo) => {
  const { data, error } = await supabase.rpc('get_itineraries', {
    divesiteid: IdNo
  });

  if (error) {
    console.log('couldn\'t do it 34,', error);
    return [];
  }

  if (data) {
    // console.log(data)
    return data;
  }
};