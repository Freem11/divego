import React, { useContext, useState } from 'react';

import { DiveSiteWithUserName } from '../../../entities/diveSite';
import { insertDiveSiteFlag } from '../../../supabaseCalls/requestSupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ModalHandleProps } from '../../reusables/modal/types';
import { Form } from './form';
import DiveSiteFlagView from './view';

export type FlagData = {
  original: DiveSiteWithUserName | null
  name?: {
    reason:  string
    newName: string
  }
  coordinates?: {
    reason:         string
    newCoordinates: {
      lat: string | number | undefined
      lng: string | number | undefined
    }
  }
};

type DiveSiteFlagProps = Partial<ModalHandleProps> & {
  diveSite: DiveSiteWithUserName | null
};

export default function DiveSiteFlag(props: DiveSiteFlagProps) {
  const { profile } = useContext(UserProfileContext);

  const [selectedReason, setSelectedReason] = useState<number | null>(null);

  const handleRequestSubmit = async (data: Form) => {
    const flagData = buildFlagData(data);
    await insertDiveSiteFlag(profile?.UserID, props.diveSite?.id, flagData);
    onClose();
  };

  function buildFlagData(data: Form) {
    const flagData: FlagData = { original: props.diveSite };

    const hasName = data.diveSiteName && data.diveSiteName.trim();
    const hasLatitude = data.diveSiteLatitude && data.diveSiteLatitude.trim();
    const hasLongitude = data.diveSiteLongitude && data.diveSiteLongitude.trim();

    if (hasName) {
      flagData.name = { reason: 'Dive site name not correct', newName: data.diveSiteName };
    }

    if (hasLatitude || hasLongitude) {
      flagData.coordinates = {
        reason:         'Dive site GPS coordinates are not correct',
        newCoordinates: {
          lat: data.diveSiteLatitude || props.diveSite?.lat,
          lng: data.diveSiteLongitude || props.diveSite?.lng,
        },
      };
    }
    return flagData;
  }

  const onClose = () => {
    props?.onModalCancel?.();
  };

  return (
    <DiveSiteFlagView
      onClose={onClose}
      diveSite={props.diveSite}
      selectedReason={selectedReason}
      setSelectedReason={setSelectedReason}
      onSubmit={handleRequestSubmit}
    />
  );
}
