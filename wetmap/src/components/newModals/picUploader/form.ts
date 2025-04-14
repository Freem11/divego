
import { FormValidationRules } from '../../../forms/form';
import i18n from '../../../i18n';
import { Option } from '../../reusables/select';

export interface Form {
  date?:         string
  photo?:        string
  animal?:       Option
  diveSiteName?: string
}

export const FormRules: FormValidationRules<Form> = {
  animal: {
    required: i18n.t('Validators.whatYouSaw'),
  },
  date: {
    required: i18n.t('Validators.whenYouSaw'),
  },
  photo: {
    required: i18n.t('Validators.noPicture'),
  },
  // longitude: {
  //   required: 'Longitude is required',
  //   max:      {
  //     value:   10,
  //     message: 'Longitude must be less than 10',
  //   } },
};
