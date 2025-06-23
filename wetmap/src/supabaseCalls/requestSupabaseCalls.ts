import { FlagData } from '../components/newModals/diveSiteFlag';
import { supabase } from '../supabase';

export const insertDiveSiteFlag = async (createdBy: string | undefined, diveSiteId: number | undefined, flagData: FlagData) => {
  const { data, error } = await supabase.from('user_requests').insert([
    {
      created_by: createdBy,
      type:       'create',
      entity:     'dive_site',
      entity_id:  diveSiteId,
      data:       flagData,
      created_at: new Date(),
    },
  ]);

  if (error) {
    console.log('couldn\'t do it,', error);
  }

  if (data) {
    console.log(data);
  }
};
