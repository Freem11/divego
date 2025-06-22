import React from 'react';
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
import { generatePhotoShareUrl } from '../../../helpers/generateShareableUrl';

type SocialPlatform = {
  name:     string
  Button:   React.ComponentType<any>
  Icon:     React.ReactNode
  getProps: (
    url: string,
    title: string,
    description?: string,
    imageUrl?: string
  ) => any
};

type Props = {
  pic:   any
  label: string
};

const ShareContent = (props: Props) => {
  const { pic } = props;
  // const hostUrl = 'https://scuba-seasons.web.app/';
  // const photoName = props.pic.photoFile.split('/').pop();
  // const shareUrl = `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`;
  const shareTitle = props.label;
  const shareDescription = `Check out this amazing photo of ${props.label} on WetMap!`;
  // const shareImageUrl = pic.photoFile;
  const shareUrl = generatePhotoShareUrl(pic, props.label);

  const createSocialPlatforms = (): SocialPlatform[] => {
    return [
      {
        name:     'Facebook',
        Button:   FacebookShareButton,
        Icon:     <Icon name="facebook" className={style.socialIcon} />,
        getProps: (url, quote, title, description) => ({
          quote,
          url,
          title,
          description,
          // hashtag: '#ScubaSEAsons', // Optional
        }),
      },
      {
        name:     'X',
        Button:   TwitterShareButton,
        Icon:     <Icon name="x-icon" className={style.socialIcon} />,
        getProps: (url, title) => ({
          url,
          title,
          // hashtags: ['ScubaSEAsons'],
        }),
      },
      {
        name:     'WhatsApp',
        Button:   WhatsappShareButton,
        Icon:     <Icon name="whatsapp" className={style.socialIcon} />,
        getProps: (url, title) => ({
          url,
          title,
          separator: ' - ', // Optional custom separator
        }),
      },
      {
        name:     'LinkedIn',
        Button:   LinkedinShareButton,
        Icon:     <Icon name="linkedin" className={style.socialIcon} />,
        getProps: (url, title, summary) => ({
          url,
          title,
          summary,
          // source: hostUrl,
        }),
      },
      {
        name:     'Email',
        Button:   EmailShareButton,
        Icon:     <Icon name="email" className={style.socialIcon} />,
        getProps: (url, title, description) => ({
          url,
          subject:   title,
          body:      description,
          separator: '\n\n',
        }),
      },
    ];
  };
  const platforms = createSocialPlatforms();
  // const handleShareUrlCopy = () => {
  //   navigator.clipboard.writeText(shareUrl);
  //   toast.success('Link copied to clipboard!', {
  //     autoClose: 1000,
  //   });
  // };

  // const handleShareModal = (
  //   e: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
  // ) => {
  //   e.stopPropagation();
  //   setSelectedPicture(pic);
  //   setShareContent(!shareContent);
  // };

  return (
    <ShareContentView
      platforms={platforms}
      shareUrl={shareUrl}
      shareTitle={shareTitle}
      shareDescription={shareDescription}
      // handleShareUrlCopy={handleShareUrlCopy}
      // handleShareModal={handleShareModal}
      // setSelectedPicture={setSelectedPicture}
      // setShareContent={setShareContent}
      // shareContent={shareContent}
      pic={pic}
    />
  );
};

export default ShareContent;
