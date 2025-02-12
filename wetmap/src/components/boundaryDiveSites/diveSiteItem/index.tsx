import React from 'react';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';
import { DiveSiteWithUserName } from '../../../entities/diveSite';
import SidebarCard from '../../reusables/sidebarCard';

type DiveSiteItemProps = {
  diveSite: DiveSiteWithUserName
};

export default function DiveSiteItem(props: DiveSiteItemProps) {
  const imageUrl = getPhotoPublicUrl(props.diveSite.photo);
  return (
    <SidebarCard
      imageUrl={imageUrl}
      title={props.diveSite.name}
    />
  );
}
