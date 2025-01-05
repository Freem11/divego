import { FormValidationRules } from '../../../forms/form';


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
  },
  password: {
    required: 'Please enter your password',
  },
};
