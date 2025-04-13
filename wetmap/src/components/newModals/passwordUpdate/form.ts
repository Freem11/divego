import { FormValidationRules } from '../../../forms/form';
import { validationPassword } from '../../../forms/validation';
import i18n from '../../../i18n';

export interface Form {
  password1: string
  password2: string
}

export const FormRules: FormValidationRules<Form> = {
  password1: {
    required:  i18n.t('Validators.requiredNewPassword'),
    ...validationPassword,
  },
};
