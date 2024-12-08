
import { FormValidationRules } from '../../../forms/form';

export interface Form {
  Site:      string
  Latitude:  number
  Longitude: number
}


export const FormRules: FormValidationRules<Form> = {
  Site: {
    required: 'Dive site name cannot be empty',
  },
  Longitude: {
     required: 'Longitude is required',
     max:      {
       value:   10,
       message: 'Longitude must be less than 10',
     } },
  Latitude: {
    required: 'Longitude is required',
    max:      {
      value:   10,
      message: 'Longitude must be less than 10',
    } }
};
