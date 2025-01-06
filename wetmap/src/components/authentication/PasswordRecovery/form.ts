import { FormValidationRules } from '../../../forms/form';
import { validationEmail } from '../../../forms/validation';
import t from '../carousel-data.json';

export interface Form {
  email: string
}

export const FormRules: FormValidationRules<Form> = {
  email: {
    required: t.PasswordRecoveryPage.emailInvalidMessage,
    ...validationEmail,
  },

};
