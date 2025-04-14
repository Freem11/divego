import { FormValidationRules } from '../../../forms/form';
import i18n from '../../../i18n';

export interface Form {
  email:    string
  password: string
}


export const FormRules: FormValidationRules<Form> = {
  email: {
    required: i18n.t('Validators.requiredEmail'),
  },
  password: {
    required: i18n.t('Validators.requiredPassword'),
  },
};
