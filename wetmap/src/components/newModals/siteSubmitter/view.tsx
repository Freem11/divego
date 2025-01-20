import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import backGroundPic from '../../../images/boat.png';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import screenData from '../screenData.json';
import TextInput from '../../reusables/textInput';
import Icon from '../../../icons/Icon';
import Button from '../../reusables/button';
import { Form, FormRules } from './form';
import style from './style.module.scss';
import { toast } from 'react-toastify';

type SiteSubmitterProps = {
  values?:           Form
  onClose:           () => void
  getDeviceLocation: () => void
  onNavigate:        () => void
  onSubmit:          (data: Form) => void
};

export default function SiteSubmitterView(props: SiteSubmitterProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({
    values: props.values,
  });

  const handleError = (errors: FieldErrors<Form>) => {
    toast.dismiss();
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  const onSubmit = (data: Form) => {
    toast.dismiss();
    props.onSubmit(data);
  };

  return (
    <div className="flex-column-between full-height">
      <WavyModalHeader image={backGroundPic} onClose={props.onClose} />

      <form className="flex-column-between full-height mx-6 mb-6" onSubmit={handleSubmit(onSubmit, handleError)}>
        <div>
          <div className="d-flex">
            <h1 className="text-clip">{screenData.DiveSiteAdd.header}</h1>
          </div>

          <div className="stack-4 mb-2">
            <TextInput
              iconLeft={<Icon name="diving-scuba-flag" />}
              placeholder={screenData.DiveSiteAdd.siteNamePlaceholder}
              error={errors.Site}
              {...register('Site', FormRules.Site)}
            />

            <TextInput
              iconLeft={<Icon name="latitude" />}
              placeholder={screenData.DiveSiteAdd.latPlaceholder}
              error={errors.Latitude}
              {...register('Latitude', FormRules.Latitude)}
            />

            <TextInput
              iconLeft={<Icon name="longitude" />}
              placeholder={screenData.DiveSiteAdd.lngPlaceholder}
              error={errors.Longitude}
              {...register('Longitude', FormRules.Longitude)}
            />
          </div>
        </div>


        <div className={style.horizontalButtonContainer}>
          <div className="col-3">
            <Button
              onClick={props.getDeviceLocation}
              className="btn-md"
              type="button"
            >
              {screenData.DiveSiteAdd.myLocationButton}
            </Button>
          </div>

          <div className="col-3 ">
            <Button
              onClick={props.onNavigate}
              className="btn-md"
              type="button"
            >
              {screenData.DiveSiteAdd.pinButton}
            </Button>
          </div>
        </div>

        <div className="cols mx-0">
          <div className="col-9"></div>
          <div className="col-3">
            <Button
              disabled={isSubmitting}
              className="btn-md bg-primary"
              type="submit"
              iconRight={<Icon name="chevron-right" />}
            >
              {screenData.DiveSiteAdd.submitButton}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
