import { FormValidationRules } from '../../../forms/form';
import { validationEmail, validationPassword } from '../../../forms/validation';


export interface Form {
  fullName: string
  email:    string
  password: string
}


export const FormRules: FormValidationRules<Form> = {
  fullName: {
    required: 'Please enter your full name',
  },
  email: {
    required: 'Please enter your email',
    ...validationEmail,
  },
  password: {
    required: 'Please enter your password',
    ...validationPassword,
  },
};
