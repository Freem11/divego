import React from 'react';
import style from './style.module.scss';
import Icon from '../../../icons/Icon';
import notLiked from '../../../images/Hand-Hollow-Blue.png';
import liked from '../../../images/Hand-Filled-Blue.png';
import { PhotoWithLikesAndComments } from '../../../entities/photos';
import Tooltip from '../../reusables/tooltip';
import { TOOLTIP_DIRECTION } from '../../reusables/tooltip';
import ScreenData from '../../newModals/screenData.json';

type SeaLifeImageCardViewProps = {
  pic:                 PhotoWithLikesAndComments
  handleModalOpen:     () => void
  handleLike:          (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => Promise<void>
  handleProfileSwitch: (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>, username: string) => Promise<void>
  handleCommentModal:  () => void
  countOfLikes:        number
  picLiked:            boolean
};

export default function SeaLifeImageCardView(props: SeaLifeImageCardViewProps) {
  const photoName = props.pic.photoFile.split('/').pop();
  return (
    <div key={props.pic.id} style={{ position: 'relative' }}>
      <div className={style.nameBar} style={{ position: 'absolute', top: 10 }}>
        <h4 className={style.animalLabelP}>{props.pic.label}</h4>
        <a
          className={style.atagp}
          href={`mailto:scubaseasons@gmail.com?subject=Reporting%20issue%20with%20picture:%20"${props.pic.label}"%20${props.pic.photoFile}&body=Type%20of%20issue:%0D%0A%0D%0A%0D%0A%0D%0A1)%20Animal%20name%20not%20correct%0D%0A%0D%0A(Please%20provide%20correct%20animal%20name%20and%20we%20will%20correct%20the%20record)%0D%0A%0D%0A%0D%0A%0D%0A2)%20Copy%20write%20image%20claim%0D%0A%0D%0A(Please%20provide%20proof%20that%20you%20own%20the%20submitted%20photo%20and%20we%20will%20remove%20it%20as%20you%20have%20requested)`}
        >
          <Tooltip direction={TOOLTIP_DIRECTION.LEFT} content={ScreenData.SeaLifeImageCard.reportPictureTooltip}>
            <Icon
              name="flag"
              color="maroon"
              width="30px"
            />
          </Tooltip>
        </a>
      </div>

      <img
        src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
        style={{ width: '100%', borderRadius: '3%', cursor: 'pointer' }}
        onClick={() => props.handleModalOpen()}
      >
      </img>

      <div className={style.footer} style={{ marginTop: '-6vh' }}>
        <h4
          className={style.userLabel}
          onClick={e => props.handleProfileSwitch(e, props.pic.UserID)}
        >
          Added by:
          {' '}
          {props.pic.UserName}
        </h4>

        <div className={style.likeButtonContainer}>
          {props.countOfLikes > 0
            ? (
                <div className={style.countIndicator}>
                  <p className="countDisplay">{props.countOfLikes}</p>
                </div>
              )
            : <div style={{ width: '40px' }}></div>}
          <img
            src={props.picLiked ? liked : notLiked}
            className={style.likeIcon}
            onClick={e => props.handleLike(e)}
            style={{
              height: 30,
              width:  30,
            }}
          />
        </div>
      </div>

      <div
        style={{
          display:       'flex',
          flexDirection: 'row',
          marginLeft:    20,
          zIndex:        4,
        }}
      >
        <p className={style.commentPrompt} onClick={() => props.handleCommentModal()}>
          {props.pic.commentcount < 1
            ? 'Be first to Comment'
            : `Comment / View all ${props.pic.commentcount} Comments`}
          {' '}
        </p>
      </div>
    </div>
  );
}
