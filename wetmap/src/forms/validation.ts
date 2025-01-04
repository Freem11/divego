export const validationEmail = {
  pattern: {
    value:   /.+\@.+/,
    message: 'Please enter a valid email address',
  },
};

export const validationPassword = {
  minLength: {
    // supabase validation: Password must be at least 6 characters long
    value:   6,
    message: 'Password must be at least 6 characters long',
  },
  maxLength: {
    // supabase validation: "Password cannot be longer than 72 characters"
    value:   72,
    message: 'Password is too long. Max length is 72 characters',
  },
};
