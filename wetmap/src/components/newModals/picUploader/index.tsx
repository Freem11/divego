import React, { useContext, useState } from 'react';
import PicUploaderView from './view';
import { DynamicSelectOptionsAnimals } from '../../../entities/DynamicSelectOptionsAnimals';
import { clearPreviousImage, handleImageUpload } from '../imageUploadHelpers';
import { insertPhotoWaits } from '../../../supabaseCalls/photoWaitSupabaseCalls';
import { Form } from './form';
import { ModalHandleProps } from '../../reusables/modal/types';
import { toast } from 'react-toastify';
import { DiveSiteContext } from '../../contexts/diveSiteContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';
import { useTranslation } from 'react-i18next';

type PicUploaderProps = Partial<ModalHandleProps> & { pictureId?: number };

export default function PicUploader(props: PicUploaderProps) {
  const { t } = useTranslation();
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
      toast.error(t('PicUploader.fileUploadError'));
    }
  };

  const onSubmit = async (formData: Required<Form>) => {
    if (!profile) {
      toast.error(t('Toast.generalError'));
      return;
    }
    if (!selectedDiveSite) {
      toast.error(t('Toast.generalError'));
      return;
    }
    if (!photoFile) {
      toast.error(t('Toast.generalError'));
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
      toast.error(t('PicUploader.uploadError'));
    } else {
      setPhotoFile(null);
      toast.success(t('PicUploader.uploadSuccess'));
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
