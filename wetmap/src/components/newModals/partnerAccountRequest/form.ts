import { FormValidationRules } from '../../../forms/form';
import i18n from '../../../i18n';

export interface Form {
  BusinessName?: string
  WebsiteLink?:  string
  Latitude?:     number
  Longitude?:    number
}

export const FormRules: FormValidationRules<Form> = {
  BusinessName: {
    required: i18n.t('Validators.requiredBusinessName'),
  },
  WebsiteLink: {
    required: i18n.t('Validators.requiredWebsite'),
  },
  Longitude: {
    required: i18n.t('Validators.requiredLongitude'),
    min:      {
      value:   -180,
      message: i18n.t('Validators.minLongitude', { value: -180 }),
    },
    max: {
      value:   180,
      message: i18n.t('Validators.maxLongitude', { value: 180 }),
    },
  },
  Latitude: {
    required: i18n.t('Validators.requiredLatitude'),
    min:      {
      value:   -180,
      message: i18n.t('Validators.minLatitude', { value: -180 }),
    },
    max: {
      value:   180,
      message: i18n.t('Validators.maxLatitude', { value: 180 }),
    },
  },
};
