import { supabase } from '../supabase';
import { toast } from 'react-toastify';
import screenData from '../components/newModals/screenData.json';
import { safeSupabase } from './_safeCall';

export const createPartnerAccountRequest = async (values) => {

  const call = () => supabase
    .from('partnerAccountRequests11')
    .insert([
      {
        webpageLink:  values.WebsiteLink,
        businessName: values.BusinessName,
        latitude:     values.Latitude,
        longitude:    values.Longitude,
        userId:       values.UserId,
      },
    ])

  return safeSupabase(call, screenData.Toast.successCreating);
};

export const grabRequestById = async (id) => {
  const { data, error } = await supabase
    .from('partnerAccountRequests')
    .select()
    .eq('userId', id);

  if (error) {
    console.log('couldn\'t do it 4,', error);
    return [];
  }

  if (data) {
    return data;
  }
};
