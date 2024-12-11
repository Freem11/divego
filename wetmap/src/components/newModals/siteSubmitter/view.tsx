import React from 'react';
import { useForm } from 'react-hook-form';

import backGroundPic from '../../../images/boat.png';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import screenData from '../screenData.json';
import TextInput from '../../reusables/textInput';
import Icon from '../../../icons/Icon';
import Button from '../../reusables/button';
import { Form, FormRules } from './form';


type SiteSubmitterProps = {
  onSubmit: (data: any) => void
  values?:  Form
};

export default function SiteSubmitterView(props: SiteSubmitterProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({
    values:   props.values,
  });

  return (
    <div className="flex-column-between full-height">
      <WavyModalHeader image={backGroundPic} />

      <form className="flex-column-between full-height mx-6 mb-6" onSubmit={handleSubmit(props.onSubmit)}>
        <div>
          <div className="d-flex">
            <h1 className="text-clip">{screenData.PicUploader.header}</h1>
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
              {...register('Latitude')}
            />

            <TextInput
              iconLeft={<Icon name="longitude" />}
              placeholder={screenData.DiveSiteAdd.lngPlaceholder}
              {...register('Longitude')}
            />
          </div>
        </div>

        <Button
          disabled={isSubmitting}
          className="btn-lg bg-primary"
          type="submit"
          iconRight={<Icon name="chevron-right" />}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
