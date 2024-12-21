import React, { useContext, useEffect } from 'react';
import LayoutMainView from './view';
import { grabProfileById } from '../../../supabaseCalls/accountSupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { SessionContext } from '../../contexts/sessionContext';
import { ModalContext } from '../../reusables/modal/context';
import SiteSubmitter from '../../newModals/siteSubmitter';
import UserProfileModal from '../../modals/userProfileModal';
import Settings from '../../modals/setting';
import { MapConfigContext } from '../../contexts/mapConfigContext';

export default function LayoutMain() {
  const { mapConfig, setMapConfig } = useContext(MapConfigContext);
  const { activeSession } = useContext(SessionContext);
  const { setProfile } = useContext(UserProfileContext);
  const { modalShow } = useContext(ModalContext);
  
  useEffect(() => {
    const getProfile = async () => {
      let sessionUserId
      if(activeSession){
        sessionUserId = activeSession.user.id;
      try {
        const success = await grabProfileById(sessionUserId);
        if (success) {
          let bully = success[0] && success[0].UserName;
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

  const animateSitSubmitterModal = () => {
    modalShow(SiteSubmitter);
  };

  const animateSettingsModal = () => {
    modalShow(Settings);
    // create new settings here
  };
  
  const animateProfileModal = () => {
    modalShow(UserProfileModal);
    // create new userprofile here
  };
  return (
    <LayoutMainView 
    mapConfig={mapConfig}
    animateSitSubmitterModal={animateSitSubmitterModal}
    animateProfileModal={animateProfileModal}
    animateSettingsModal={animateSettingsModal}
    />
  );
}
