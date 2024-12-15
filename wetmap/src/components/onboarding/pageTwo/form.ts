import { FormValidationRules } from '../../../forms/form';


export interface Form {
  username: string
}


export const FormRules: FormValidationRules<Form> = {
  username: {
    required: 'Please enter your username',
  }
};
