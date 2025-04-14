
import { FormValidationRules } from '../../../forms/form';
import i18n from '../../../i18n';

const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;
const MIN_LATITUDE = -180;
const MAX_LATITUDE = 180;

export interface Form {
  Site?:      string
  Latitude?:  number
  Longitude?: number
}


export const FormRules: FormValidationRules<Form> = {
  Site: {
    required: i18n.t('Validators.requiredSite'),
  },
  Longitude: {
    required: i18n.t('Validators.requiredLongitude'),
    min:      {
      value:   MIN_LONGITUDE,
      message: i18n.t('Validators.minLongitude', { value: MIN_LONGITUDE }),
    },
    max:      {
      value:   MAX_LONGITUDE,
      message: i18n.t('Validators.maxLongitude', { value: MAX_LONGITUDE }),
    } },
  Latitude: {
    required: i18n.t('Validators.requiredLatitude'),
    min:      {
      value:   MIN_LATITUDE,
      message: i18n.t('Validators.minLatitude', { value: MIN_LATITUDE }),
    },
    max:      {
      value:   MAX_LATITUDE,
      message: i18n.t('Validators.maxLatitude', { value: MAX_LATITUDE }),
    },
  },
};
