import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import Icon from '../../../icons/Icon';
import Button from '../../reusables/button/index';
import TextInput from '../../reusables/textInput';
import ButtonIcon from '../../reusables/buttonIcon';
import screenData from '../screenData.json';
import DynamicSelect from '../../reusables/dynamicSelect';
import WavyModalHeader from '../../reusables/wavyModalHeader';

import style from './style.module.scss';
import { Form, FormRules } from './form';
import FileInput from '../../reusables/fileInput';
import Label from '../../reusables/label';
import { toast } from 'react-toastify';

type PicUploaderViewProps = {
  values:               Form
  onClose?:             () => void
  onSubmit:             (data: any) => void
  getMoreAnimals:       (search: string, limit: number, skip: number) => Promise<any>
  handleImageSelection: (event: React.ChangeEvent<HTMLInputElement>) => void
  headerPictureUrl:     string | null
};

export default function PicUploaderView(props: PicUploaderViewProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({
    values:   props.values,
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

      <WavyModalHeader image={props.headerPictureUrl} onClose={props.onClose}>

        <FileInput
          {...register('photo', FormRules.photo)}
          onFileChange={props.handleImageSelection}
          className="d-none"
        >
          {props.headerPictureUrl
            ? (
                <ButtonIcon
                  icon={<Icon name="camera-plus" />}
                  className={`btn-lg ${style.buttonImageUpload} ${errors.photo ? 'blinking' : ''}`}
                />
              )
            : (
                <Button
                  className={`btn-lg ${style.buttonImageUploadLarge}`}
                >
                  {screenData.PicUploader.uploadButton}
                </Button>
              )}
        </FileInput>
      </WavyModalHeader>

      <form
        className="flex-column-between full-height mx-10 mb-6"
        onSubmit={handleSubmit(onSubmit, handleError)}
      >
        <div className="d-flex">
          <h1 className="mb-0 text-clip">{screenData.PicUploader.header}</h1>
        </div>

        <div className="stack-4 mb-2">
          <Label label={screenData.PicUploader.whatLabel}>
            <DynamicSelect
              {...register('animal', FormRules.animal)}
              allowCreate={true}
              labelInValue={true}
              modeSelectedTags="on"
              placeholder={screenData.PicUploader.whatPlaceholder}
              getMoreOptions={props.getMoreAnimals}
              iconLeft={<Icon name="shark" />}
              error={errors.animal}
            />
          </Label>

          <Label label={screenData.PicUploader.whatLabel}>
            <TextInput
              {...register('date', FormRules.date)}
              type="date"
              iconLeft={<Icon name="calendar-month" />}
              placeholder={screenData.PicUploader.whenPlaceholder}
              error={errors.date}
              max={new Date().toLocaleString('sv-SE').split(' ')[0]}
            />
          </Label>

          <Label label={screenData.PicUploader.whereLabel}>
            <TextInput
              {...register('diveSiteName')}
              iconLeft={<Icon name="anchor" />}
              placeholder={screenData.PicUploader.wherePlaceholder}
              disabled={true}
            />
          </Label>
        </div>

        <div className="cols">
          <div className="col-8"></div>
          <div className="col-4">
            <Button
              disabled={isSubmitting}
              className="btn-lg bg-primary col-3"
              type="submit"
              iconRight={<Icon name="chevron-right" />}
            >
              {screenData.PicUploader.submitButton}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
