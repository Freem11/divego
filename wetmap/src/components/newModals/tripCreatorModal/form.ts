import { FormValidationRules } from '../../../forms/form';
import i18n from '../../../i18n';

export interface Form {
  Name?:    string
  Link?:    string
  Price?:   string
  Start?:   string
  End?:     string
  Details?: string
}

export const FormRules: FormValidationRules<Form> = {
  Name: {
    required: i18n.t('Validators.requiredTripName'),
  },
  Link: {
    required: i18n.t('Validators.requiredLink'),
  },
  Price: {
    required: i18n.t('Validators.requiredPrice'),
    min:      {
      value:   0,
      message: i18n.t('Validators.minPrice', { value: 0 }),
    },
    pattern: /^\$\d+(\.\d{1,2})?$/,
  },
  Start: {
    required: i18n.t('Validators.requiredStartDate'),
  },
  End: {
    required: i18n.t('Validators.requiredEndDate'),
  },
  Details: {
    required: i18n.t('Validators.requiredDetails'),
  },
};
