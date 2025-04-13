import { FormValidationRules } from '../../../forms/form';
import { validationEmail } from '../../../forms/validation';
import i18n from '../../../i18n';

export interface Form {
  email: string
}

export const FormRules: FormValidationRules<Form> = {
  email: {
    required: i18n.t('Validators.requiredEmail'),
    ...validationEmail,
  },

};
