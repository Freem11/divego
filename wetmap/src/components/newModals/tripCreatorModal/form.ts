
import { FormValidationRules } from '../../../forms/form';

export interface Form {
  Name?:    string
  Link?:    string
  Price?:   string
  Start?:   string
  End?:     string
  Details?: string
}


export const FormRules = (startDate: string | undefined): FormValidationRules<Form>  => ({
  Name: {
    required: 'Trip name name cannot be empty',
  },
  Link: {
    required: 'Link is required',
  },
  Price: {
    required: 'Price is required',
    min:      {
      value:   0,
      message: 'Price must be atleast 0',
    },
    pattern:  /^\$\d+(\.\d{1,2})?$/,
  },
  Start: {
    required: 'Start date is required',
  },
  End: {
    required: 'End date is required',
    validate: value =>
      !startDate || new Date(value) >= new Date(startDate) || 'End date must be after start date',
  },
});
