import { supabase } from "../supabase";

export const addDeletedAccountInfo = async (values) => {

  console.log("passing", values)
  const { data, error } = await supabase
  .from("deletedUsers")
  .insert([
    {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      uuid: values.UserID
    },
  ]);

  if (error) {
    console.log("couldn't do it,", error);
  }

  if (data) {
    console.log(data);
  }
};


export const createProfile = async (values) => {

  const { data, error } = await supabase
  .from("UserProfiles")
  .insert([
    {
      Email: values.email,
      UserID: values.id
    },
  ]);

if (error) {
  console.log("couldn't do it,", error);
}

if (data) {
  console.log(data);
}
};

export const updateProfile = async (values) => {

  console.log("supabase gets", values)
  const { data, error } = await supabase
    .from("UserProfiles")
    .update({ UserName: values.username })
    .eq("UserID", values.id);

    console.log("supa sends",data, error)

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const deleteProfile = async (id) => {
  const { data, error } = await supabase
    .from("UserProfiles")
    .delete()
    .eq("UserID", id);

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    console.log(data);
  }
};

export const grabProfileById = async (id) => {
  const { data, error } = await supabase
    .from("UserProfiles")
    .select()
    .eq("UserID", id)

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};