import { supabase } from '../supabase';
import { SupabaseError } from './_safeCall';

const TABLE_NAME = "partnerAccountRequests"

type PartnerAccountRequestValues = {
  WebsiteLink: string;
  BusinessName: string;
  Latitude: number;
  Longitude: number;
  UserId: string;
};

export const createPartnerAccountRequest = async (
  values: PartnerAccountRequestValues
): Promise<any> => {

  // TODO: partnerAccountRequests111 --> TABLE_NAME

  const { data, error } = await supabase
    .from('partnerAccountRequests111')
    .insert([
      {
        webpageLink: values.WebsiteLink,
        businessName: values.BusinessName,
        latitude: values.Latitude,
        longitude: values.Longitude,
        userId: values.UserId,
      },
    ]);

  if (error) {
    throw new SupabaseError(error.message, error.details);
  }

  return data;
};

export const grabRequestById = async (id: string): Promise<any> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select()
    .eq('userId', id);

  if (error) {
    throw new SupabaseError(error.message, error.details);
  }

  return data;
};