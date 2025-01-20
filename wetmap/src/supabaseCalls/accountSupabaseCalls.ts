import { ActiveProfile } from '../entities/profile';
import { supabase } from '../supabase';

export const addDeletedAccountInfo = async (values) => {
  console.log('passing', values);
  const { data, error } = await supabase
    .from('deletedUsers')
    .insert([
      {
        firstName: values.firstName,
        lastName:  values.lastName,
        email:     values.email,
        uuid:      values.UserID,
      },
    ]);

  if (error) {
    console.log('couldn\'t do it,', error);
  }

  if (data) {
    console.log(data);
  }
};


export const createProfile = async (values) => {
  const { data, error } = await supabase
    .from('UserProfiles')
    .insert([
      {
        Email:  values.email,
        UserID: values.id,
      },
    ]);

  if (error) {
    console.log('couldn\'t do it,', error);
  }

  if (data) {
    console.log(data);
  }
};

export const updateProfile = async (profile: Partial<ActiveProfile>) => {
  const response = await supabase
    .from('UserProfiles')
    .update(profile)
    .eq('UserID', profile.UserID);

  if (response.error) {
    console.log('couldn\'t do it,', response.error);
  }

  return response;
};

export const deleteProfile = async (id) => {
  const { data, error } = await supabase
    .from('UserProfiles')
    .delete()
    .eq('UserID', id);

  if (error) {
    console.log('couldn\'t do it,', error);
    return [];
  }

  if (data) {
    console.log(data);
  }
};

export const grabProfileById = async (id: string) => {
  const { data, error } = await supabase
    .from('UserProfiles')
    .select()
    .eq('UserID', id);

  if (error) {
    console.log('couldn\'t do it,', error);
    return null;
  }

  if (data[0]) {
    return data[0] as ActiveProfile;
  }
  return null;
};

export const grabProfileByUserName = async (userName: string) => {
  const { data, error } = await supabase
    .from('UserProfiles')
    .select()
    .eq('UserName', userName);

  if (error) {
    console.log('couldn\'t do it 5,', error);
    return [];
  }

  if (data) {
    return data as ActiveProfile[];
  }
};

export const getProfileWithStats = async (userId) => {
  const { data, error } = await supabase.rpc('get_userprofile_with_stats', {
    userid: userId,
  });

  if (error) {
    console.error('couldn\'t do it 27,', error);
    return [];
  }

  if (data) {
    return data;
  }
};
