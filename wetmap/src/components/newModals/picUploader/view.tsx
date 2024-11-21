import React from 'react';
import { useForm } from 'react-hook-form';

import Icon from '../../../icons/Icon';
import Button from '../../reusables/button/index';
import TextInput from '../../reusables/textInput';
import ButtonIcon from '../../reusables/buttonIcon';
import screenData from '../screenData.json';
import DynamicSelect from '../../reusables/dynamicSelect';
import backGroundPic from '../../../images/boat.png';
import WavyModalHeader from '../../reusables/wavyModalHeader';

import style from './style.module.scss';

type PicUploaderViewProps = {
  onSubmit:       (data: any) => void
  getMoreAnimals: (search: string, limit: number, skip: number) => Promise<any>
};

export default function PicUploaderView(props: PicUploaderViewProps) {
  const { register, handleSubmit } = useForm();

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

      <form
        className="flex-column-between full-height mx-6 mb-6"
        onSubmit={handleSubmit(props.onSubmit)}
      >
        <div className="d-flex">
          <h1 className="mb-0 text-clip">{screenData.PicUploader.header}</h1>
        </div>

        <div className="stack-4">
          <DynamicSelect
            allowCreate={true}
            labelInValue={true}
            modeSelectedTags="on"
            getMoreOptions={props.getMoreAnimals}
            iconLeft={<Icon name="shark" />}
            {...register('animal')}
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
