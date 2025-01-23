import React, { useState, useContext, useEffect } from 'react';
import UserProfileView from './view';
// import { PhotosGroupedByDate } from '../../../entities/photos';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ModalContext } from '../../reusables/modal/context';
import { ModalHandleProps } from '../../reusables/modal/types';
import {
  grabProfileById,
  updateProfile,
} from '../../../supabaseCalls/accountSupabaseCalls';
import Settings from '../../newModals/setting';
import { ActiveProfile } from '../../../entities/profile';
import { toast } from 'react-toastify';
import screenData from '../screenData.json';


type UserProps = Partial<ModalHandleProps> & {
  userProfileID?: string
};
export default function UserProfile(props: UserProps) {
  const { profile, setProfile }          = useContext(UserProfileContext);
  const { modalShow }                    = useContext(ModalContext);
  const [openedProfile, setOpenedProfile] = useState<ActiveProfile | null>(null);
  const isActiveProfile: boolean = !props.userProfileID;

  useEffect(() => {
    (async () => {
      if (props.userProfileID) {
        setOpenedProfile(await grabProfileById(props.userProfileID));
      } else {
        setOpenedProfile(profile);
      }
    })();
  }, [props.userProfileID]);

  const handleProfileNameChange = async (newName: string) => {
    if (newName == '') {
      toast.error(screenData.UserProfile.EmptyUserNameError);
      return false;
    }

    if (profile) {
      const response = await updateProfile({
        UserID:       profile!.UserID,
        UserName: newName,
      });
      if (!response.error) {
        toast.success(screenData.UserProfile.UserProfileUpdateSuccessMessage);
        setProfile({ ...profile, UserName: newName });
        return;
      }

      if (response.error.code == '23505') {
        toast.error(screenData.UserProfile.DuplicateUserNameErrorMessage);
        return;
      }

      toast.error(screenData.Toast.generalError);
    }
  };

  const handleProfileBioChange = async (newBio: string) => {
    if (profile) {
      if (profile) {
        const response = await updateProfile({
          UserID:       profile!.UserID,
          profileBio: newBio,
        });
        if (!response.error) {
          toast.success(screenData.UserProfile.UserProfileUpdateSuccessMessage);
          setProfile({ ...profile, profileBio: newBio });
          return;
        }


        toast.error(screenData.Toast.generalError);
      }
    }
  };

  const openSettings = () => {
    modalShow(Settings);
  };

  return (
    <UserProfileView
      onClose={props.onModalCancel}
      profile={openedProfile}
      handleProfileBioChange={handleProfileBioChange}
      handleProfileNameChange={handleProfileNameChange}
      handleFollow={() => {}}
      openSettings={openSettings}
      isActiveProfile={isActiveProfile}
      handleImageSelection={() => {}}
    />
  );
}
