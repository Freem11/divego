import React from 'react';
import style from './style.module.scss';
import Icon from '../../../icons/Icon';
import { PhotoWithLikesAndComments } from '../../../entities/photos';
import Tooltip from '../tooltip';
import { TOOLTIP_DIRECTION } from '../tooltip';
import ScreenData from '../../newModals/screenData.json';
import BlurryImage from '../blurryImage';
import abbreviateNumber from '../../../helpers/abbreviateNumber';

type SeaLifeCardViewProps = {
  pic:                 PhotoWithLikesAndComments
  handleModalOpen:     () => void
  handleLike:          (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => Promise<void>
  handleProfileSwitch: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, username: string) => Promise<void>
  handleDiveSiteMove:  (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, lat: number, lng: number) => void
  handleCommentModal:  (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => void
  countOfLikes:        number
  picLiked:            boolean
  isShowAuthor:        boolean
};

export default function SeaLifeCardView(props: SeaLifeCardViewProps) {
  console.log(props);
  const photoName = props.pic.photoFile.split('/').pop();

  return (
    <div className={style.card} onClick={() => props.handleModalOpen()}>
      <div className={`${style.overlay} ${style.fadeDelay}`}></div>
      <BlurryImage
        src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
        className={`${style.backgroundImage} ${style.fadeDelay}`}
      />
      <a
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
                Visit site
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
              className={`${style.actionIcon} ${props.picLiked && style.liked}`}
              name="like"
            />
            <span>
              {abbreviateNumber(props.countOfLikes)}
            </span>
          </div>
          <div
            onClick={e => props.handleCommentModal(e)}
            className={style.action}
          >
            <Icon
              className={style.actionIcon}
              name="comment"
            />
            <span>
              {abbreviateNumber(props.pic.commentcount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
