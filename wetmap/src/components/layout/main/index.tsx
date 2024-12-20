import React, { useContext, useEffect } from 'react';
import LayoutMainView from './view';
import { grabProfileById } from '../../../supabaseCalls/accountSupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { SessionContext } from '../../contexts/sessionContext';

export default function LayoutMain() {
  const { activeSession } = useContext(SessionContext);
  const { setProfile } = useContext(UserProfileContext);
  
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

  return (
    <LayoutMainView />
  );
}
