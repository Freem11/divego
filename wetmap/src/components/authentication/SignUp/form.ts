import { FormValidationRules } from '../../../../forms/form';


export interface Form {
  fullname: string,
  email: string,
  password: string
}


export const FormRules: FormValidationRules<Form> = {
  fullname: {
    required: 'Please enter your full name',
  },
  email: {
    required: 'Please enter your email',
  },
  password: {
    required: 'Please enter your password',
  },
};
