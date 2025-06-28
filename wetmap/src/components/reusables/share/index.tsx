import React, { useMemo } from 'react';
// import { toast } from 'react-toastify';
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
  TwitterShareButton,
} from 'react-share';
import style from './style.module.scss';
import ShareContentView from './view';
import Icon from '../../../icons/Icon';

export type SocialPlatform = {
  name:          string
  Button:        React.ComponentType<any>
  Icon:          React.ReactNode
  platformProps: {
    hashtag?:      string
    hashtags?:     string[]
    separator?:    string
    subject?:      string
    body?:         string
    windowWidth?:  number
    windowHeight?: number
  }
};

const ShareContent = () => {
  const shareUrl = `https://scuba-seasons.web.app/`;
  const shareTitle = 'Scuba SEAsons - Dive into Amazing Underwater Adventures!';
  const shareDescription = 'Discover the best diving spots and marine life encounters worldwide. Share your underwater adventures with the diving community.';

  const platforms = useMemo<SocialPlatform[]>(() => {
    return [
      {
        name:          'Facebook',
        Button:        FacebookShareButton,
        Icon:          <Icon name="facebook" className={style.socialIcon} />,
        platformProps: {
          hashtag:  '#ScubaSEAsons',
        },
      },
      {
        name:          'X',
        Button:        TwitterShareButton,
        Icon:          <Icon name="x-icon" className={style.socialIcon} />,
        platformProps: {
          hashtags:  ['ScubaSEAsons'],
        },
      },
      {
        name:          'WhatsApp',
        Button:        WhatsappShareButton,
        Icon:          <Icon name="whatsapp" className={style.socialIcon} />,
        platformProps: {
          separator:    ' - ',
        },
      },
      {
        name:          'LinkedIn',
        Button:        LinkedinShareButton,
        Icon:          <Icon name="linkedin" className={style.socialIcon} />,
        platformProps: {
          summary: 'test',
          source:  shareUrl,
        },
      },
      {
        name:          'Email',
        Button:        EmailShareButton,
        Icon:          <Icon name="email" className={style.socialIcon} />,
        platformProps: {
          subject:   'Scuba SEAsons - Dive into Amazing Underwater Adventures!',
          body:      'Discover the best diving spots and marine life encounters worldwide. Share your underwater adventures with the diving community.',
          separator: '\n\n',
        },
      },
    ];
  }, []);

  return (
    <ShareContentView
      platforms={platforms}
      shareUrl={shareUrl}
      shareTitle={shareTitle}
      shareDescription={shareDescription}
    />
  );
};

export default ShareContent;
