
import { FormValidationRules } from '../../../forms/form';

export interface Form {
  Name?:    string
  Link?:    string
  Price?:   number
  Start?:   number
  End?:     number
  Details?: string
}


export const FormRules: FormValidationRules<Form> = {
  Name: {
    required: 'Dive site name cannot be empty',
  },
  Link: {
    required: 'Dive site name cannot be empty',
  },
  Price: {
    required: 'Dive site name cannot be empty',
  },
  Start: {
    required: 'Dive site name cannot be empty',
  },
  End: {
    required: 'Dive site name cannot be empty',
  },
  Details: {
    required: 'Dive site name cannot be empty',
  },
};
