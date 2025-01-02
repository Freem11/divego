import React, { useState, useContext, useEffect } from 'react';
import UserProfileView from './view';
import { updateDiveSite } from '../../../supabaseCalls/diveSiteSupabaseCalls';
import { SelectedDiveSiteContext } from '../../contexts/selectedDiveSiteContext';
import { PhotosGroupedByDate } from '../../../entities/photos';
import { getPhotosByDiveSiteWithExtra } from '../../../supabaseCalls/photoSupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ActiveSession } from '../../../entities/session';
import { clearPreviousImage, handleImageUpload } from '../imageUploadHelpers';
import { PinContext } from '../../contexts/staticPinContext';
import { ModalContext } from '../../reusables/modal/context';
import PicUploader from '../picUploader/index';
import { ModalHandleProps } from '../../reusables/modal/types';
import {
  grabProfileById,
  getProfileWithStats,
  updateProfile,
  updateProfileDescription,
} from '../../../supabaseCalls/accountSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';
import Settings from '../../modals/setting';
import { ActiveProfile } from '../../../entities/profile';

interface CustomUserProps extends Partial<ModalHandleProps> {
  selectedProfile?: any
}

type UserProps = CustomUserProps;
export default function UserProfile(props: UserProps) {
  const { activeSession } = useContext(SessionContext);
  const { profile, setProfile }          = useContext(UserProfileContext);
  const { modalShow }                    = useContext(ModalContext);
  //   const [headerPictureUrl, setHeaderPictureUrl] = useState<string | null>(null);
  //   const [isPartnerAccount, setIsPartnerAccount] = useState(false);
  useEffect(() => {
    if (props.selectedProfile) {
      (getProfileDetails(props.selectedProfile));
    } else {
      (getProfileDetails(activeSession?.user.id));
    }
  }, []);

  const getProfileDetails = async (profile: any) => {
    try {
      const openProfile = await grabProfileById(profile);
      setProfile(openProfile![0]);
    } catch (e) {
      console.log((e as Error).message);
    }
  };
  // console.log(profile);
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
      try {
        await updateProfile({
          id:       profile!.UserID,
          username: newName,
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
      try {
        await updateProfileDescription({ profileBio: newBio, id: profile!.UserID });
      } catch (e) {
        console.log((e as Error).message);
      }
    }
  };

  const openSettings = () => {
    modalShow(Settings);
  };

  //   useEffect(() => {
  //     if (profile && profile.partnerAccount) {
  //       setIsPartnerAccount(true);
  //     }
  //   }, [profile]);

  //   const getPhotos = async (site: DiveSiteWithUserName, user: ActiveProfile | null) => {
  //     try {
  //       const photos = await getPhotosByDiveSiteWithExtra({
  //         lat:    site.lat,
  //         lng:    site.lng,
  //         userId: user?.UserID,
  //       });
  //       if (photos) {
  //         setDiveSitePics(photos);
  //       }
  //     } catch (e) {
  //       console.log({ title: 'Error', message: (e as Error).message });
  //     }
  //   };

  //   const handleImageSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (!selectedDiveSite) {
  //       return;
  //     }
  //     if (selectedDiveSite.divesiteprofilephoto) {
  //       clearPreviousImage(selectedDiveSite.divesiteprofilephoto);
  //     }

  //     const createFileName = await handleImageUpload(event);
  //     setSelectedDiveSite({
  //       ...selectedDiveSite,
  //       divesiteprofilephoto: `animalphotos/public/${createFileName}`,
  //     });
  //   };

  //   const openPicUploader = () => {
  //     if (selectedDiveSite) {
  //       setPin({
  //         ...pin,
  //         Latitude:  selectedDiveSite.lat,
  //         Longitude: selectedDiveSite.lng,
  //         siteName:  selectedDiveSite.name,
  //       });
  //     }


  //     modalShow(PicUploader);
  //   };

  return (
    <UserProfileView
      onClose={props.onModalCancel}
      profile={profile!}
      handleProfileBioChange={handleProfileBioChange}
      handleProfileNameChange={handleProfileNameChange}
      handleFollow={() => {}}
      openSettings={openSettings}
      isActiveProfile={activeSession?.user.id == profile?.UserID}
      //   openPicUploader={openPicUploader}
      //   handleImageSelection={handleImageSelection}
      //   headerPictureUrl={headerPictureUrl}
    />
  );
}
