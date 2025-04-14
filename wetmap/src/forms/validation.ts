import i18n from '../i18n';

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 72;

export const validationEmail = {
  pattern: {
    value:   /.+\@.+/,
    message: i18n.t('Validators.requiredEmail'),
  },
};


export const validationPassword = {
  minLength: {
    // supabase validation: Password must be at least PASSWORD_MIN_LENGTH characters long
    value:   PASSWORD_MIN_LENGTH,
    message: i18n.t('Validators.requiredLongPassword',  { value: PASSWORD_MIN_LENGTH }),
  },
  maxLength: {
    // supabase validation: "Password cannot be longer than PASSWORD_MAX_LENGTH characters"
    value:   PASSWORD_MAX_LENGTH,
    message: i18n.t('Validators.passwordTooLong',  { value: PASSWORD_MAX_LENGTH }),
  },
};
