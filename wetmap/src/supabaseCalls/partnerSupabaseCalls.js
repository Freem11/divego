import { supabase } from '../supabase';

const TABLE_NAME = 'partnerAccountRequests';

export const createPartnerAccountRequest = async (values) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([
      {
        webpageLink:  values.WebsiteLink,
        businessName: values.BusinessName,
        latitude:     values.Latitude,
        longitude:    values.Longitude,
        userId:       values.UserId,
      },
    ]);

  if (error) {
    console.log('couldn\'t do it 33,', error);
  }

  if (data) {
    console.log(data);
  }

  return { data, error };
};

export const grabRequestById = async (id) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
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
