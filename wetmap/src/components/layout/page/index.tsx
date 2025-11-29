import React, { useContext, useEffect, useState } from 'react';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ModalContext } from '../../reusables/modal/context';

import { MapContext } from '../../googleMap/mapContext';
import LayoutPageView from './view';
import { useNavigate } from 'react-router-dom';

export default function LayoutPage() {
  const { mapConfig } = useContext(MapContext);
  const { profile } = useContext(UserProfileContext);
  const { modalShow } = useContext(ModalContext);
  const [showShareContent, setShowShareContent] = useState(false);
  const [isPartnerAccount, setIsPartnerAccount] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile && profile.partnerAccount) {
      setIsPartnerAccount(true);
    }
  }, [profile]);

  useEffect(() => {
    if (profile && !profile.UserName) {
      handleOnBoarding();
    }
  }, [profile]);

  const handleOnBoarding = () => {
    animateOnBoardingModal();
  };


  return (
    <LayoutPageView
      mapConfig={mapConfig}
      showShareContent={showShareContent}
      isPartnerAccount={isPartnerAccount}
    />
  );
}
