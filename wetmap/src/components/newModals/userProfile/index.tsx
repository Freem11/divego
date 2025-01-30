import React, { useState, useContext, useEffect } from 'react';
import UserProfileView from './view';
// import { PhotosGroupedByDate } from '../../../entities/photos';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ModalContext } from '../../reusables/modal/context';
import { ModalHandleProps } from '../../reusables/modal/types';
import {
  grabProfileById,
  updateProfile,
  getProfileWithStats,
} from '../../../supabaseCalls/accountSupabaseCalls';
import {
  insertUserFollow,
  deleteUserFollow,
  checkIfUserFollows,
} from '../../../supabaseCalls/userFollowSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';
// import Settings from '../../modals/setting';
import Settings from '../../newModals/setting';
import { ActiveProfile } from '../../../entities/profile';
import { toast } from 'react-toastify';
import screenData from '../screenData.json';


type UserProps = Partial<ModalHandleProps> & {
  userProfileID?: string
};
export default function UserProfile(props: UserProps) {
  const { activeSession } = useContext(SessionContext);
  const { profile, setProfile }          = useContext(UserProfileContext);
  const { modalShow }                    = useContext(ModalContext);
  const [openedProfile, setOpenedProfile] = useState<ActiveProfile | null>(null);
  const isActiveProfile: boolean = !props.userProfileID;
  const [userFollows, setUserFollows] = useState(false);
  const [userStats, setUserStats] = useState<any>('');
  const [followData, setFollowData] = useState(activeSession.user.id);

  useEffect(() => {
    (async () => {
      if (props.userProfileID) {
        setOpenedProfile(await grabProfileById(props.userProfileID));
      } else {
        setOpenedProfile(profile);
      }
    })();
  }, [props.userProfileID]);

  useEffect(() => {
    getProfile();

    async function followCheck() {
      let alreadyFollows = await checkIfUserFollows(
        profile.UserID,
        openedProfile,
      );
      if (alreadyFollows.length > 0) {
        setUserFollows(true);
        setFollowData(alreadyFollows[0].id);
      }
      console.log(alreadyFollows);
      // this function does not seem to be working properly
    }

    followCheck();
  }, []);

  const getProfile = async () => {
    let userID;
    if (openedProfile) {
      userID = openedProfile.UserID;
      try {
        const success = await getProfileWithStats(userID);
        if (success) {
          setUserStats(success);
        }
      }
      catch (e) {
        console.log({ title: 'Error', message: (e as Error).message });
      }
    }
  };

  const handleFollow = async () => {
    console.log(userFollows);
    if (userFollows) {
      console.log(userFollows);
      deleteUserFollow(followData);
      setUserFollows(false);
    } else {
      if (userStats && profile) {
        let newRecord = await insertUserFollow(
          profile.UserID,
          openedProfile?.UserID,
        );
        setFollowData(newRecord[0].id);
        setUserFollows(true);
        // console.log(userStats[0]);
      }
    }
  };

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
      handleFollow={handleFollow}
      openSettings={openSettings}
      isActiveProfile={isActiveProfile}
      handleImageSelection={() => {}}
      isFollowing={userFollows}
    />
  );
}
