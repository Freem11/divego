import { FormValidationRules } from '../../../forms/form';
import { validationEmail } from '../../../forms/validation';
import screenData from '../../newModals/screenData.json';

export interface Form {
  email: string
}

export const FormRules: FormValidationRules<Form> = {
  email: {
    required: screenData.PasswordRecoveryPage.emailInvalidMessage,
    ...validationEmail,
  },

};
