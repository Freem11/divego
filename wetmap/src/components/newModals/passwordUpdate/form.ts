import { FormValidationRules } from '../../../forms/form';
import { validationPassword } from '../../../forms/validation';

export interface Form {
  password1: string
  password2: string
}

export const FormRules: FormValidationRules<Form> = {
  password1: {
    required:  'Please enter new password',
    ...validationPassword,
  },
};
