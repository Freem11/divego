import { ActiveProfile, DeletedAccountInfo } from '../entities/profile';
import { supabase } from '../supabase';

const USERS_PROFILE_TABLE = 'UserProfiles';
const DELETE_USER_TABLE = 'deletedUsers';

export const addDeletedAccountInfo = async (values: DeletedAccountInfo) => {
  const response = await supabase
    .from(DELETE_USER_TABLE)
    .insert([
      {
        firstName: values.firstName,
        lastName:  values.lastName,
        email:     values.email,
        uuid:      values.UserID,
      },
    ]);

  if (response.error) {
    console.log('couldn\'t do it,', response.error);
  }

  if (response.data) {
    console.log(response.data);
  }

  return response;
};


export const createProfile = async (values) => {
  const { data, error } = await supabase
    .from(USERS_PROFILE_TABLE)
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

export const updateProfile = async (values: { username: string, id: string }) => {
  console.log('supabase gets', values);
  const { data, error } = await supabase
    .from(USERS_PROFILE_TABLE)
    .update({ UserName: values.username })
    .eq('UserID', values.id);

  console.log('supa sends', data, error);

  if (error) {
    console.log('couldn\'t do it,', error);
    throw error;
  }

  if (data) {
    return data as ActiveProfile[];
  }
};

export const deleteProfile = async (id: string) => {
  const response = await supabase
    .from(USERS_PROFILE_TABLE)
    .delete()
    .eq('UserID', id);

  if (response.error) {
    console.log('couldn\'t do it,', response.error);
  }

  if (response.data) {
    console.log(response.data);
  }

  return response;
};

export const grabProfileById = async (id: string) => {
  const { data, error } = await supabase
    .from(USERS_PROFILE_TABLE)
    .select()
    .eq('UserID', id);

  if (error) {
    console.log('couldn\'t do it,', error);
    return [];
  }

  if (data) {
    return data as ActiveProfile[];
  }
};

export const grabProfileByUserName = async (userName: string) => {
  const { data, error } = await supabase
    .from(USERS_PROFILE_TABLE)
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
