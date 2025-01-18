import React from 'react';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';
import { DiveSiteWithUserName } from '../../../entities/diveSite';
import ListItemWithImage from '../../reusables/listItemWithImage';

type DiveSiteItemProps = {
  diveSite: DiveSiteWithUserName
};

export default function DiveSiteItem(props: DiveSiteItemProps) {
  const imageUrl = getPhotoPublicUrl(props.diveSite.photo);

  return (
    <ListItemWithImage
      imageUrl={imageUrl}
      title={props.diveSite.name}
      date={props.diveSite.divesitebio}
    />
  );
}
