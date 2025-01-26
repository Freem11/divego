import React, { useContext, useEffect, useState } from 'react';
import LayoutMainView from './view';
import { grabProfileById } from '../../../supabaseCalls/accountSupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { SessionContext } from '../../contexts/sessionContext';
import { ModalContext } from '../../reusables/modal/context';
import SiteSubmitter from '../../newModals/siteSubmitter';
import Settings from '../../newModals/setting';
import UserProfile from '../../newModals/userProfile';
import GuidesModal from '../../newModals/guides';
import TripCreatorListModal from '../../newModals/tripCreatorListModal';
import { MapContext } from '../../googleMap/mapContext';
import OnBoardingCarrousel from '../../onboarding';

export default function LayoutMain() {
  const { mapConfig } = useContext(MapContext);
  const { activeSession } = useContext(SessionContext);
  const { profile, setProfile } = useContext(UserProfileContext);
  const { modalShow } = useContext(ModalContext);
  const [isPartnerAccount, setIsPartnerAccount] = useState(false);

  useEffect(() => {
    if (profile && profile.partnerAccount) {
      setIsPartnerAccount(true);
    }
  }, [profile]);

  useEffect(() => {
    const getProfile = async () => {
      let sessionUserId;
      if (activeSession) {
        sessionUserId = activeSession.user.id;
        try {
          const success = await grabProfileById(sessionUserId);
          if (success) {
            const bully = success && success.UserName;
            if (bully == null || bully === '') {
              handleOnBoarding();
              return;
            } else {
              setProfile(success);
            }
          }
        } catch (e) {
          console.log({ title: 'Error', message: (e as Error).message });
        }
      }
    };

    getProfile();
  }, []);

  const handleOnBoarding = () => {
    animateOnBoardingModal();
  };

  const animateOnBoardingModal = () => {
    modalShow(OnBoardingCarrousel, {
      size:        'full',
      allowCancel: false,
    });
  };

  const animateSiteSubmitterModal = () => {
    modalShow(SiteSubmitter);
  };

  const animateSettingsModal = () => {
    modalShow(Settings);
  };

  const animateProfileModal = () => {
    modalShow(UserProfile);
  };

  const animateGuidesModal = () => {
    modalShow(GuidesModal);
  };

  const animateTripCreatorListModal = () => {
    modalShow(TripCreatorListModal);
  };


  return (
    <LayoutMainView
      mapConfig={mapConfig}
      animateSiteSubmitterModal={animateSiteSubmitterModal}
      animateProfileModal={animateProfileModal}
      animateSettingsModal={animateSettingsModal}
      animateGuidesModal={animateGuidesModal}
      animateTripCreatorListModal={animateTripCreatorListModal}
      isPartnerAccount={isPartnerAccount}
    />
  );
}
