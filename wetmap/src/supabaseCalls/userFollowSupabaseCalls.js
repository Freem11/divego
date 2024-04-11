import { supabase } from "../supabase";

export const insertUserFollow = async (userId, followUserId) => {

  const { data, error } = await supabase
  .from("followUsers")
  .insert([
    {
      user: userId,
      follows: followUserId,
    },
  ]).select('*');

  if (error) {
    console.log("couldn't do it 40,", error);
  }

  if (data) {
    return (data);
  }
};

export const deleteUserFollow = async (id) => {
  const { data, error } = await supabase
    .from("followUsers")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("couldn't do it 41,", error);
    return [];
  }

  // if (data) {
  //   console.log(data);
  // }
};

export const checkIfUserFollows = async (userId, followUserId) => {

  const { data, error } = await supabase
  .from("followUsers")
  .select()
  .eq("user", userId)
  .eq("follows", followUserId);

  if (error) {
    console.log("couldn't do it 40,", error);
  }

  if (data) {
    return (data);
  }
};