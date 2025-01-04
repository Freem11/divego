import { FormValidationRules } from '../../../../forms/form';


export interface Form {
  email: string,
  password: string
}


export const FormRules: FormValidationRules<Form> = {
  email: {
    required: 'Please enter your email',
  },
  password: {
    required: 'Please enter your password',
  },
};
