import React, { useState, useContext, useEffect } from 'react';
import UserProfileView from './view';
import { PhotosGroupedByDate } from '../../../entities/photos';
import { UserProfileContext } from '../../contexts/userProfileContext';
// import { ActiveSession } from '../../../entities/session';
// import { clearPreviousImage, handleImageUpload } from '../imageUploadHelpers';
// import { PinContext } from '../../contexts/staticPinContext';
import { ModalContext } from '../../reusables/modal/context';
// import PicUploader from '../picUploader/index';
import { ModalHandleProps } from '../../reusables/modal/types';
import {
  grabProfileById,
  getProfileWithStats,
  updateProfile,
} from '../../../supabaseCalls/accountSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';
import Settings from '../../newModals/setting';
import { ActiveProfile } from '../../../entities/profile';


type UserProps = Partial<ModalHandleProps> & {
  userProfileID?: string
};
export default function UserProfile(props: UserProps) {
  const { activeSession } = useContext(SessionContext);
  const { profile, setProfile }          = useContext(UserProfileContext);
  const { modalShow }                    = useContext(ModalContext);
  const [openedProfile, setOpenedProfile] = useState<ActiveProfile | null>(null);
  const isActiveProfile: boolean = !props.userProfileID;

  useEffect(() => {
    (async () => {
      if (props.userProfileID) {
        const testProfile = await grabProfileById(props.userProfileID);
        console.log(testProfile);
        setOpenedProfile(testProfile);
      } else {
        setOpenedProfile(profile);
      }
    })();
  }, []);

  // console.log(openedProfile);
  // const getProfileDetails = async (profile: any) => {
  //   try {
  //     const testProfile = await grabProfileById(profile)[0];
  //     setOpenedProfile(testProfile);
  //   } catch (e) {
  //     console.log((e as Error).message);
  //   }
  // };

  const handleProfileNameChange = async (newName: string) => {
    // console.log(((newName ?? '').localeCompare('')));
    // console.log((newName));
    // if (((newName ?? '').localeCompare('')) == 1) {
    //   console.log('Your Username cannot be blank!');
    //   // I'm thinking we can add a toast to alert the user of this
    //   return false;
    // } else {
    if (profile) {
      setProfile({ ...profile, UserName: newName });
      setOpenedProfile({ ...openedProfile, UserName: newName });
      try {
        await updateProfile({
          UserID:       profile!.UserID,
          UserName: newName,
        });
      } catch (e) {
        // if (e && e.code === '23505') {
        //   console.log('This username belongs to another user');
        //   // probably a toast for this as well
        //   return false;
        // }
        console.log('Something went wrong. Please try later.');
        console.log((e as Error).message);
        // toast for this as well
        return false;
      }
      // }
    }
  };

  const handleProfileBioChange = async (newBio: string) => {
    if (profile) {
      setProfile({ ...profile, profileBio: newBio });
      setOpenedProfile({ ...openedProfile!, profileBio: newBio });
      try {
        await updateProfile({ profileBio: newBio, UserID: profile.UserID });
      } catch (e) {
        console.log((e as Error).message);
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
    />
  );
}
