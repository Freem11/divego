import { supabase } from '../supabase';
import { ItineraryItem } from '../entities/itineraryItem';

export const itineraries = async (IdNo: number) => {
  const { data, error } = await supabase
    .from('itineraries')
    .select()
    .eq('shopID', IdNo);

  if (error) {
    console.log('couldn\'t do it 34,', error);
    return ([]);
  }

  if (data) {
    return data as ItineraryItem[];
  }
};
