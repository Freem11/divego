import React, { useContext, useEffect, useState } from 'react';
import LayoutMainView from './view';
import { grabProfileById } from '../../../supabaseCalls/accountSupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { SessionContext } from '../../contexts/sessionContext';
import { ModalContext } from '../../reusables/modal/context';
import { MapConfigContext } from '../../contexts/mapConfigContext';
import SiteSubmitter from '../../newModals/siteSubmitter';
import Settings from '../../newModals/setting';
import UserProfile from '../../newModals/userProfile';
import GuidesModal from '../../newModals/guides';
import TripCreatorListModal from '../../newModals/tripCreatorListModal';

export default function LayoutMain() {
  const { mapConfig } = useContext(MapConfigContext);
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
            const bully = success[0] && success[0].UserName;
            if (bully == null || bully === '') {
              return;
            } else {
              setProfile(success[0]);
            }
          }
        } catch (e) {
          console.log({ title: 'Error', message: (e as Error).message });
        }
      }
    };

    getProfile();
  }, []);

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
