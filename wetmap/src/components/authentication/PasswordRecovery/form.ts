import { FormValidationRules } from '../../../forms/form';

export interface Form {
  email: string
}

export const FormRules: FormValidationRules<Form> = {
  email: {
    required: 'Please enter your email',
  },

};
