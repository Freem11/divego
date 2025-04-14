import React, { useState, useContext, useEffect } from 'react';
import UserProfileView from './view';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ModalContext } from '../../reusables/modal/context';
import { ModalHandleProps } from '../../reusables/modal/types';
import {
  grabProfileById,
  updateProfile,
} from '../../../supabaseCalls/accountSupabaseCalls';
import {
  insertUserFollow,
  deleteUserFollow,
  checkIfUserFollows,
} from '../../../supabaseCalls/userFollowSupabaseCalls';
import Settings from '../../newModals/setting';
import { ActiveProfile } from '../../../entities/profile';
import { toast } from 'react-toastify';
import { clearPreviousImage, handleImageUpload } from '../imageUploadHelpers';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';
import { PhotosGroupedByDate } from '../../../entities/photos';
import { getPhotosByUserWithExtra } from '../../../supabaseCalls/photoSupabaseCalls';
import { useTranslation } from 'react-i18next';

type UserProps = Partial<ModalHandleProps> & {
  userProfileID?: string
};
export default function UserProfile(props: UserProps) {
  const { profile, initProfile }         = useContext(UserProfileContext);
  const { modalShow }                    = useContext(ModalContext);
  const [openedProfile, setOpenedProfile] = useState<ActiveProfile | null>(null);
  const [headerPictureUrl, setHeaderPictureUrl] = useState<string | null>(null);
  const [diveSitePics, setDiveSitePics] = useState<PhotosGroupedByDate[] | null>(null);
  const isActiveProfile: boolean = !props.userProfileID;
  const [userIsFollowing, setUserIsFollowing] = useState(false);
  const [followRecordID, setFollowRecordID] = useState(profile?.UserID);
  const { t } = useTranslation();

  async function profileCheck() {
    if (props.userProfileID) {
      const selectedProfile = await grabProfileById(props.userProfileID);
      setOpenedProfile(selectedProfile);
    } else {
      setOpenedProfile(profile);
    }
  }

  async function followCheck() {
    if (openedProfile && profile) {
      const alreadyFollows = await checkIfUserFollows(
        profile.UserID,
        openedProfile.UserID,
      );
      if (alreadyFollows && alreadyFollows.length > 0) {
        setUserIsFollowing(true);
        setFollowRecordID(alreadyFollows[0].id);
      }
    }
  }

  useEffect(() => {
    profileCheck();
  }, [props.userProfileID, profile]);


  useEffect(() => {
    followCheck();
    getPhotos();
  }, [openedProfile?.UserID]);


  const handleFollow = async () => {
    if (userIsFollowing) {
      deleteUserFollow(followRecordID);
      setUserIsFollowing(false);
    } else {
      if (profile) {
        const newRecord = await insertUserFollow(
          profile.UserID,
          openedProfile?.UserID,
        );
        setFollowRecordID(newRecord && newRecord[0].id);
        setUserIsFollowing(true);
      }
    }
  };

  const getPhotos = async () => {
    if (!profile || !openedProfile) return;
    const response = await getPhotosByUserWithExtra(openedProfile.UserID, profile.UserID);
    setDiveSitePics(response.data || []);
  };

  const handleProfileNameChange = async (newName: string) => {
    if (newName == '') {
      toast.error(t('UserProfile.EmptyUserNameError'));
      return false;
    }

    if (profile) {
      const response = await updateProfile({
        UserID:       profile!.UserID,
        UserName: newName,
      });
      if (!response.error) {
        toast.success(t('UserProfile.UserProfileUpdateSuccessMessage'));
        initProfile(true);
        return;
      }

      if (response.error.code == '23505') {
        toast.error(t('UserProfile.DuplicateUserNameErrorMessage'));
        return;
      }

      toast.error(t('Toast.generalError'));
    }
  };

  const handleProfileBioChange = async (newBio: string) => {
    if (profile) {
      const response = await updateProfile({
        UserID:       profile.UserID,
        profileBio: newBio,
      });
      if (!response.error) {
        toast.success(t('UserProfile.UserProfileUpdateSuccessMessage'));
        initProfile(true);
        return;
      }


      toast.error(t('Toast.generalError'));
    }
  };

  const handleImageSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!openedProfile) {
      return;
    }
    if (openedProfile.profilePhoto) {
      clearPreviousImage(openedProfile.profilePhoto);
    }

    const createFileName = await handleImageUpload(event);
    if (profile) {
      await updateProfile({
        UserID:       profile.UserID,
        profilePhoto: `animalphotos/public/${createFileName}`,
      });
      initProfile(true);
    }
  };

  useEffect(() => {
    if (openedProfile?.profilePhoto) {
      const photoName = getPhotoPublicUrl(openedProfile.profilePhoto);
      setHeaderPictureUrl(photoName);
    } else {
      setHeaderPictureUrl(null);
    }
  }, [openedProfile?.profilePhoto]);


  const openSettings = () => {
    modalShow(Settings);
  };

  return (
    <UserProfileView
      onClose={props.onModalCancel}
      profile={openedProfile}
      handleImageSelection={handleImageSelection}
      handleProfileBioChange={handleProfileBioChange}
      handleProfileNameChange={handleProfileNameChange}
      handleFollow={handleFollow}
      openSettings={openSettings}
      headerPictureUrl={headerPictureUrl}
      isActiveProfile={isActiveProfile}
      diveSitePics={diveSitePics}
      isFollowing={userIsFollowing}
    />
  );
}
