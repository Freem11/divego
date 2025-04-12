
import { FormValidationRules } from '../../../forms/form';
import i18n from '../../../i18n';

export interface Form {
  Site?:      string
  Latitude?:  number
  Longitude?: number
}


export const FormRules: FormValidationRules<Form> = {
  Site: {
    required: i18n.t('validators:DiveSiteAdd.requiredSite'),
  },
  Longitude: {
    required: i18n.t('validators:DiveSiteAdd.requiredLongitude'),
    min:      {
      value:   -180,
      message: i18n.t('validators:DiveSiteAdd.minLongitude', { value: -180 }),
    },
    max:      {
      value:   180,
      message: i18n.t('validators:DiveSiteAdd.maxLongitude', { value: 180 }),
    } },
  Latitude: {
    required: i18n.t('validators:DiveSiteAdd.requiredLatitude'),
    min:      {
      value:   -180,
      message: i18n.t('validators:DiveSiteAdd.minLatitude', { value: -180 }),
    },
    max:      {
      value:   180,
      message: i18n.t('validators:DiveSiteAdd.maxLatitude', { value: 180 }),
    },
  },
};
