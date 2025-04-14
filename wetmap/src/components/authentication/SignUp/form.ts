import { FormValidationRules } from '../../../forms/form';
import { validationEmail, validationPassword } from '../../../forms/validation';
import i18n from '../../../i18n';


export interface Form {
  fullName: string
  email:    string
  password: string
}


export const FormRules: FormValidationRules<Form> = {
  fullName: {
    required: i18n.t('Validators.requiredFullName'),
  },
  email: {
    required: i18n.t('Validators.enterYourEmail'),
    ...validationEmail,
  },
  password: {
    required: i18n.t('Validators.requiredPassword'),
    ...validationPassword,
  },
};
