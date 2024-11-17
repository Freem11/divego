import React, { useRef } from 'react';
import backGroundPic from '../../../images/blackManta.png';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import screenData from '../screenData.json';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../reusables/textInput';
import Icon from '../../../icons/Icon';
import style from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';
import Button from '../../reusables/button/index';
import DynamicSelect from '../../reusables/dynamicSelect';


type PicUploaderViewProps = {
  onSubmit:       (data: any) => void
  getMoreAnimals: () => void
};

export default function PicUploaderView(props: PicUploaderViewProps) {
  const { register, control, handleSubmit } = useForm();

  return (
    <div className="flex-column-between full-height">
      <WavyModalHeader image={backGroundPic}>
        <div className={style.buttonImageUpload}>
          <ButtonIcon
            icon={<Icon name="camera-plus" />}
            className="btn-lg"
            onClick={() => fileUploaderRef?.current?.click?.()}
          />
        </div>
      </WavyModalHeader>

      <form className="flex-column-between full-height mx-6 mb-6" onSubmit={handleSubmit(props.onSubmit)}>
        <div className="d-flex">
          <h1 className="mb-0 text-clip">{screenData.PicUploader.header}</h1>
        </div>


        <div className="stack-4">


          <Controller
            name="animal"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <DynamicSelect
                {...field}
                prefix={<Icon name="shark" />}
                maxTagCount={5}
                showSearch
                style={{ width: '100%' }}
                optionFilterProp="label"
                getMoreOptions={props.getMoreAnimals}
              />
            )}
          />


          <TextInput
            iconLeft={<Icon name="calendar-month" />}
            placeholder={screenData.PicUploader.whenPlaceholder}
            {...register('date')}
          />
          <TextInput
            iconLeft={<Icon name="anchor" />}
            iconRight={<Icon name="anchor" />}
            placeholder={screenData.PicUploader.wherePlaceholder}
            {...register('diveSiteName')}
          />
        </div>
        <div></div>
        <Button
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
