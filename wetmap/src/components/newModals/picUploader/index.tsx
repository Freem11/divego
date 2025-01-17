import React, { useContext, useState } from 'react';
import PicUploaderView from './view';
import { DynamicSelectOptionsAnimals } from '../../../entities/DynamicSelectOptionsAnimals';
import { PinContext } from '../../contexts/staticPinContext';
import { clearPreviousImage, handleImageUpload } from '../imageUploadHelpers';
import { insertPhotoWaits } from '../../../supabaseCalls/photoWaitSupabaseCalls';
import { Form } from './form';
import { ModalHandleProps } from '../../reusables/modal/types';
import { toast } from 'react-toastify';
import screenData from '../screenData.json';

type PicUploaderProps = Partial<ModalHandleProps> & { pictureId?: number };

export default function PicUploader(props: PicUploaderProps) {
  const { pin, setPin } = useContext(PinContext);
  const [picUrl, setPicUrl] = useState<string | null>(null);

  props?.registerModalCancelCallback?.(() => {
    if (pin?.PicFile) {
      clearPreviousImage(pin?.PicFile);
      setPin({ ...pin, PicFile: null });
    }
  });

  const handleImageSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (pin?.PicFile) {
      clearPreviousImage(pin?.PicFile);
    }
    try {
      const createFileName = await handleImageUpload(event);
      setPicUrl(import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_PATH + `${createFileName}`);
      setPin({
        ...pin,
        PicFile: `animalphotos/public/${createFileName}`,
      });
    } catch (e) {
      console.error(e);
      toast.error(screenData.PicUploader.fileUploadError);
    }
  };

  const onSubmit = async (formData: Required<Form>) => {
    const { error } = await insertPhotoWaits({
      label:      formData.animal.label,
      dateTaken:  formData.date,
      UserID:     pin?.UserID,
      photoFile:  pin?.PicFile,
      latitude:   pin?.Latitude,
      longitude:  pin?.Longitude,
    });

    if (error) {
      toast.error(screenData.PicUploader.uploadError);
    } else {
      toast.success(screenData.PicUploader.uploadSuccess);
    }

    setPin({ ...pin, PicFile: null });
  };

  return (
    <PicUploaderView
      headerPictureUrl={picUrl}
      handleImageSelection={handleImageSelection}
      getMoreAnimals={DynamicSelectOptionsAnimals.getMoreOptions}
      onClose={props.onModalCancel}
      onSubmit={onSubmit}
      values={{
        diveSiteName: pin?.siteName,
      }}
    />
  );
}
