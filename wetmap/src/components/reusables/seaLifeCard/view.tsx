import React, { SetStateAction } from 'react';
import style from './style.module.scss';
import Icon from '../../../icons/Icon';
import { PhotoWithLikesAndComments } from '../../../entities/photos';
import Tooltip from '../tooltip';
import { TOOLTIP_DIRECTION } from '../tooltip';
import ScreenData from '../../newModals/screenData.json';
import BlurryImage from '../blurryImage';
import abbreviateNumber from '../../../helpers/abbreviateNumber';
import screenData from '../../newModals/screenData.json';

type SeaLifeCardViewProps = {
  label:           string
  pic:             PhotoWithLikesAndComments
  isShowAuthor?:   boolean
  picLiked?:       boolean
  countOfLikes:    number
  shareContent?:   boolean
  setShareContent: React.Dispatch<SetStateAction<boolean>>
  handleModalOpen: () => void
  handleLike: (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => Promise<void>
  handleProfileSwitch: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    username: string
  ) => Promise<void>
  handleDiveSiteMove: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    lat: number,
    lng: number
  ) => void
  handleCommentModal: (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => void
  handleShareModal: (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => void
};

import { toast } from 'react-toastify';
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  // EmailShareButton,
  TwitterShareButton,
} from 'react-share';

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

export default function SeaLifeCardView(props: SeaLifeCardViewProps) {
  console.log(props);
  const hostUrl = 'https://scuba-seasons.web.app/';
  const photoName = props.pic.photoFile.split('/').pop();
  const createSocialPlatforms = (): SocialPlatform[] => {
    return [
      {
        name:     'Facebook',
        Button:   FacebookShareButton,
        Icon:     <Icon name="facebook" className={style.socialIcon} />,
        getProps: (url, quote) => ({
          quote,
          url,
          hashtag: '#Scuba SEAsons', // Optional
        }),
      },
      {
        name:     'X',
        Button:   TwitterShareButton,
        Icon:     <Icon name="x-icon" className={style.socialIcon} />,
        getProps: (url, title) => ({
          url,
          title,
          hashtags: ['Scuba SEAsons'],
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
          source: hostUrl,
        }),
      },
      // {
      //   name:     'Email',
      //   Button:   EmailShareButton,
      //   Icon:     <Icon name="email-send-outline" className={style.socialIcon} />,
      //   getProps: (url, title, description) => ({
      //     url,
      //     subject: title,
      //     body:    description
      //       ? `${description}\n\nCheck out this link: ${url}`
      //       : `Check out this link: ${url}`,
      //     separator:              '\n\n',
      //     openShareDialogOnClick: true, // Explicitly set for EmailShareButton
      //   }),
      // },
    ];
  };

  const platforms = createSocialPlatforms();

  // const shareUrl = `https://scuba-seasons.web.app/${photoName}`;
  const shareUrl = `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`;
  const shareImageUrl = `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`;
  const shareTitle = props.label;
  const shareDescription = `Check out this amazing photo of ${props.label} on WetMap!`;

  return (
    <div className={style.card} onClick={() => props.handleModalOpen()}>
      <div className={`${style.overlay} ${style.fadeDelay}`}></div>
      <BlurryImage
        src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
        className={`${style.backgroundImage} ${style.fadeDelay}`}
      />
      <div className={`${style.innerCard} ${style.fadeDelay}`}>
        <a
          onClick={e => e.stopPropagation()}
          href={`mailto:scubaseasons@gmail.com?subject=Reporting%20issue%20with%20picture:%20"${props.pic.label}"%20${props.pic.photoFile}&body=Type%20of%20issue:%0D%0A%0D%0A%0D%0A%0D%0A1)%20Animal%20name%20not%20correct%0D%0A%0D%0A(Please%20provide%20correct%20animal%20name%20and%20we%20will%20correct%20the%20record)%0D%0A%0D%0A%0D%0A%0D%0A2)%20Copy%20write%20image%20claim%0D%0A%0D%0A(Please%20provide%20proof%20that%20you%20own%20the%20submitted%20photo%20and%20we%20will%20remove%20it%20as%20you%20have%20requested)`}
          className={style.report}
        >
          <Tooltip direction={TOOLTIP_DIRECTION.LEFT} content={ScreenData.SeaLifeImageCard.reportPictureTooltip}>
            <Icon
              name="error-outline"
              className={style.reportIcon}
            />
          </Tooltip>
        </a>
        <div className={style.content}>
          <div>
            <p className={style.title}>{props.pic.label}</p>
            <div className={style.info}>
              {props.isShowAuthor && (
                <a onClick={e => props.handleProfileSwitch(e, props.pic.UserID)}>
                  {props.pic.UserName}
                </a>
              ) }
              {!props.isShowAuthor && (
                <a onClick={e => props.handleDiveSiteMove(e, props.pic.latitude, props.pic.longitude)}>
                  {screenData.SeaLifeImageCard.visitSitePrompt}
                </a>
              )}
            </div>
          </div>
          <div className={style.actions}>
            <div
              onClick={e => props.handleLike(e)}
              className={style.action}
            >
              <Icon
                className={`${style.actionIcon} ${style.biggerIcon} ${props.picLiked && style.liked}`}
                name="like-hand"
              />
              <span>
                {abbreviateNumber(props.countOfLikes)}
              </span>
            </div>
            <div
              onClick={e => props.handleCommentModal(e)}
              className={style.action}
            >
              <Icon className={style.actionIcon} name="comment" />
              <span>{abbreviateNumber(props.pic.commentcount)}</span>
            </div>
            <div
              onClick={e => props.handleShareModal(e)}
              className={style.action}
            >
              <Icon className={style.actionIcon} name="share" />
              {props.shareContent && (
                <div
                  className={style.socialShareContainer}
                  onClick={e => e.stopPropagation()}
                >
                  {platforms.map((platform) => {
                    const { name, Button, Icon, getProps } = platform;
                    const buttonProps = getProps(
                      shareUrl,
                      shareTitle,
                      shareDescription,
                      shareImageUrl,
                    );

                    return (
                      <Button
                        key={name}
                        {...buttonProps}
                        className={style.socialButton}
                        htmlTitle={`${name} share`}
                        aria-label={name}
                        onShareWindowClose={() =>
                          toast.success(`Shared via ${name}!`, {
                            autoClose: 1000,
                          })}
                      >
                        {Icon}
                      </Button>
                    );
                  })}
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      toast.success('Link copied to clipboard!', {
                        autoClose: 1000,
                      });
                    }}
                    className={style.socialButton}
                    style={{ backgroundColor: 'transparent' }}
                    aria-label="Copy url"
                    title="Copy url"
                  >
                    <Icon name="link" className={style.socialIcon} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
