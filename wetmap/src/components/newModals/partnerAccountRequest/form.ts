
import { FormValidationRules } from '../../../forms/form';

export interface Form {
  BusinessName?: string
  WebsiteLink?:  string
  Latitude?:     number
  Longitude?:    number
}


export const FormRules: FormValidationRules<Form> = {
  BusinessName: {
    required: 'Business name cannot be empty',
  },
  WebsiteLink: {
    required: 'Website link cannot be empty',
  },
  Longitude: {
    required: 'Longitude is required',
    min:      {
      value:   -180,
      message: 'Longitude must be greater than -180',
    },
    max: {
      value:   180,
      message: 'Longitude must be less than 180',
    },
  },
  Latitude: {
    required: 'Longitude is required',
    min:      {
      value:   -180,
      message: 'Latitude must be greater than -180',
    },
    max: {
      value:   180,
      message: 'Latitude must be less than 180',
    },
  },
};
