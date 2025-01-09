import { supabase } from '../supabase';


export const sessionCheck = async () => {
  const session = await supabase.auth.getSession();
  return session;
};

export const sessionRefresh = async (refresh_token: string) => {
  const { data, error } = await supabase.auth.refreshSession({ refresh_token });

  if (error) {
    console.log('couldn\'t refresh session,', error);
  }

  if (data) {
    // console.log(data);
    return data;
  }
};

export const userCheck = async () => {
  const user = await supabase.auth.getUser();
  return user;
};

type registrationDetails = {
  email:    string
  password: string
  fullName: string

};

export const register = async (registerDetails: registrationDetails) => {
  const response = await supabase.auth.signUp(
    {
      email:    registerDetails.email,
      password: registerDetails.password,
      options:  {
        data: {
          fullName: registerDetails.fullName,
        },
      },
    },
  );

  if (response.error) {
    console.log(response.error);
  }

  return response;
};

type loginDetails = {
  email:    string
  password: string
};

export const signInStandard = async (loginDetails: loginDetails) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email:    loginDetails.email,
    password: loginDetails.password,
  });

  if (error) {
    console.log('couldn\'t login,', error);
  }

  if (data) {
    return { data };
  }
};


export const performPasswordReset = async (newPassowrd: string) => {
  const response = await supabase.auth.updateUser({
    password: newPassowrd,
  });

  if (response.error) {
    console.log('couldn\'t update password,', response.error);
  }

  return response;
};

export const signInFaceBook = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'facebook',
  });

  if (error) {
    console.log('couldn\'t login,', error);
  }

  if (user && session) {
    console.log(user, session);
    return { user, session };
  }
};

export const signInGoogle = async () => {
  console.log('made it');
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google',
  });

  console.log(user, session, error);
  if (error) {
    console.log('couldn\'t login,', error);
  }

  if (user && session) {
    // console.log(user, session);
    return { user, session };
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log('couldn\'t logout,', error);
  }
};

export const userDelete = async (userIdValue: string) => {
  console.log('supa gets', userIdValue);
  const { data, error } = await supabase.rpc('delete_user', { userid: userIdValue });

  if (error) {
    console.log('couldn\'t delete user,', error);
    return [];
  }

  if (data) {
    console.log('user was deleted');
  }
};

export const sendPasswordResetEmail = async (email: string, url: string) => {
  const response = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: url,
  });

  if (response.error) {
    console.log(response.error);
  }

  return response;
};


export const socialSignIn = async (provider: any) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
  });

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
    return data;
  }
};
