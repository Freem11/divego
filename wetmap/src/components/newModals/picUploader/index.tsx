import React, { useContext, useState } from 'react';
import PicUploaderView from './view';
import { DynamicSelectOptionsAnimals } from '../../../entities/DynamicSelectOptionsAnimals';
import { clearPreviousImage, handleImageUpload } from '../imageUploadHelpers';
import { insertPhotoWaits } from '../../../supabaseCalls/photoWaitSupabaseCalls';
import { Form } from './form';
import { ModalHandleProps } from '../../reusables/modal/types';
import { toast } from 'react-toastify';
import screenData from '../screenData.json';
import { DiveSiteContext } from '../../contexts/diveSiteContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';

type PicUploaderProps = Partial<ModalHandleProps> & { pictureId?: number };

export default function PicUploader(props: PicUploaderProps) {
  const { profile } = useContext(UserProfileContext);
  const { selectedDiveSite } = useContext(DiveSiteContext);

  const [photoFile, setPhotoFile] = useState<string | null>(null);
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);


  props?.registerModalCancelCallback?.(() => {
    if (photoFile && !successfullySubmitted) {
      clearPreviousImage(photoFile);
    }
  });

  const handleImageSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (photoFile) {
      clearPreviousImage(photoFile);
    }
    try {
      const createFileName = await handleImageUpload(event);
      setPhotoFile(`animalphotos/public/${createFileName}`);
    } catch (e) {
      console.error(e);
      toast.error(screenData.PicUploader.fileUploadError);
    }
  };

  const onSubmit = async (formData: Required<Form>) => {
    if (!profile) {
      toast.error(screenData.Toast.generalError);
      return;
    }
    if (!selectedDiveSite) {
      toast.error(screenData.Toast.generalError);
      return;
    }
    if (!photoFile) {
      toast.error(screenData.Toast.generalError);
      return;
    }
    const { error } = await insertPhotoWaits({
      label:      formData.animal.label,
      dateTaken:  formData.date,
      UserID:     profile.UserID,
      photoFile:  photoFile,
      latitude:   selectedDiveSite.lat,
      longitude:  selectedDiveSite.lng,
    });
    if (error) {
      toast.error(screenData.PicUploader.uploadError);
    } else {
      setPhotoFile(null);
      toast.success(screenData.PicUploader.uploadSuccess);
    }

    setSuccessfullySubmitted(true);
  };

  return (
    <PicUploaderView
      headerPictureUrl={photoFile && getPhotoPublicUrl(photoFile)}
      handleImageSelection={handleImageSelection}
      getMoreAnimals={DynamicSelectOptionsAnimals.getMoreOptions}
      onClose={props.onModalCancel}
      onSubmit={onSubmit}
      values={{
        diveSiteName: selectedDiveSite?.name,
      }}
    />
  );
}
