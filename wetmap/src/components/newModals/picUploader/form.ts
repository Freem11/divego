
import { FormValidationRules } from '../../../forms/form';
import { Option } from '../../reusables/select';

export interface Form {
  date?:         string
  photo?:        string
  animal?:       Option
  diveSiteName?: string
}

export const FormRules: FormValidationRules<Form> = {
  animal: {
    required: 'Please tell us what you saw',
  },
  date: {
    required: 'Please tell us when you saw it',
    max:      {
      value:   new Date().toISOString().split('T')[0],
      message: 'Date can\'t be in the future',
    },
  },
  photo: {
    required: 'No picture uploaded',
  },
  // longitude: {
  //   required: 'Longitude is required',
  //   max:      {
  //     value:   10,
  //     message: 'Longitude must be less than 10',
  //   } },
};
