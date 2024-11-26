import React, { useContext, useState } from 'react';
import PicUploaderView from './view';
import { DynamicSelectOptionsAnimals } from '../../../entities/DynamicSelectOptionsAnimals';
import { PinContext } from '../../contexts/staticPinContext';
import { clearPreviousImage, handleImageUpload } from '../imageUploadHelpers';
import { insertPhotoWaits } from '../../../supabaseCalls/photoWaitSupabaseCalls';
import { Form } from './form';


export default function PicUploader(props) {
  const { pin, setPin } = useContext(PinContext);
  const [picUrl, setPicUrl] = useState<string | null>(null);

  props.registerCancelCallback(() => {
    if (pin.PicFile) {
      clearPreviousImage(pin.PicFile);
      setPin({ ...pin, PicFile: null });
    }
  });

  const handleImageSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (pin.PicFile) {
      clearPreviousImage(pin.PicFile);
    }

    const createFileName = await handleImageUpload(event);
    setPicUrl(import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_PATH + `${createFileName}`);
    setPin({
      ...pin,
      PicFile: `animalphotos/public/${createFileName}`,
    });
  };

  const onSubmit = async (data: Required<Form>) => {
    insertPhotoWaits({
      label:      data.animal.label,
      dateTaken:  data.date,
      UserID:     pin.UserID,
      photoFile:  pin.PicFile,
      latitude:   pin.Latitude,
      longitude:  pin.Longitude,
    });
    setPin({ ...pin, PicFile: null });
    props.onModalSuccess();
  };

  return (
    <PicUploaderView
      headerPictureUrl={picUrl}
      handleImageSelection={handleImageSelection}
      getMoreAnimals={DynamicSelectOptionsAnimals.getMoreOptions}
      onClose={props.onModalCancel}
      onSubmit={onSubmit}
      values={{
        diveSiteName: pin.siteName,
      }}
    />
  );
}
