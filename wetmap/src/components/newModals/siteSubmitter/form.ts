
import { FormValidationRules } from '../../../forms/form';

export interface Form {
  name:      string
  latitude:  number
  longitude: number
}


export const FormRules: FormValidationRules<Form> = {
  name: {
    required: 'Dive site name cannot be empty',
  },
  // longitude: {
  //   required: 'Longitude is required',
  //   max:      {
  //     value:   10,
  //     message: 'Longitude must be less than 10',
  //   } },
};
