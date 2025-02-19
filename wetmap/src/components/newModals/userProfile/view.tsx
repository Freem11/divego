import React from 'react';
import screenData from '../screenData.json';
import style from './style.module.scss';
import Button from '../../reusables/button';
import Icon from '../../../icons/Icon';
import defaultHeaderPicture from '../../../images/blackManta.png';
import { PhotosGroupedByDate } from '../../../entities/photos';
import PlainTextInput from '../../reusables/plainTextInput';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import ButtonIcon from '../../reusables/buttonIcon';
import SeaLifeImageCard from '../../reusables/seaLifeImageCard';
import { ActiveProfile } from '../../../entities/profile';
import FileInput from '../../reusables/fileInput';
import Tooltip from '../../reusables/tooltip';

type userProfileViewProps = {
  onClose?:                () => void
  profile:                 ActiveProfile | null
  handleProfileBioChange:  (profileBio: string) => void
  handleProfileNameChange: (profileName: string) => void
  handleFollow:            () => void
  openSettings:            () => void
  isActiveProfile:         boolean
  handleImageSelection:    (event: React.ChangeEvent<HTMLInputElement>) => void
  isFollowing:             boolean
  headerPictureUrl:        string | null
  diveSitePics:            PhotosGroupedByDate[] | null
};

export default function UserProfileView(props: userProfileViewProps) {
  return (
    <div className="cols mx-0 full-height">
      <div className="col-6">
        <WavyModalHeader
          image={props.headerPictureUrl || defaultHeaderPicture}
          onClose={props.onClose}
        >
          <div className={style.buttonOpenPictureUpload}></div>

          {(props.isActiveProfile) && (
            <div className={style.buttonImageUpload}>
              <FileInput
                onFileChange={props.handleImageSelection}
                className="d-none"
              >
                <Tooltip content={screenData.UserProfile.addProfilePhotoToolTip}>
                  <ButtonIcon
                    icon={<Icon name="camera-plus" />}
                    className="btn-lg"
                  />
                </Tooltip>
              </FileInput>
            </div>
          )}
        </WavyModalHeader>

        <div className="ml-6">
          <div className="stack-4">
            <div>
              <div className="d-flex">
                <h1 className="mb-0">
                  <PlainTextInput
                    readOnly={!props?.isActiveProfile}
                    onSave={props?.handleProfileNameChange}
                    value={props.profile?.UserName}
                    tooltipEditText="Click here to change your diver name"
                    tooltipConfirmText="Click here to confirm changes"
                  />
                </h1>
              </div>
            </div>

            <div className="panel border-none">
              <div className="panel-body">
                <PlainTextInput
                  readOnly={!props?.isActiveProfile}
                  onSave={props?.handleProfileBioChange}
                  value={props.profile?.profileBio ?? ''}
                  placeholder={screenData.UserProfile.userDefaultDescription}
                  tooltipEditText="Click here to write a bio about yourself"
                  tooltipConfirmText="Click here to confirm changes to your bio"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-6 panel border-none full-height">
        <div className="panel-header">
          <h3>{`${props.profile?.UserName}'s Sea Creature Encounters`}</h3>
          <div className={style.addPictureButton}>
            {(props.isActiveProfile)
              ? (
                  <Button className="btn-lg" onClick={props.openSettings}>
                    <span className="hide-sm">
                      Settings
                    </span>
                  </Button>
                )
              : (
                  <Tooltip content={screenData.UserProfile.FollowToolTip}>
                    <Button className={props.isFollowing ? 'btn-lg btn-primary' : 'btn-lg'}onClick={props.handleFollow}>
                      {(props.isFollowing)
                        ? (
                            <span className="hide-sm">
                              Following
                            </span>
                          )
                        : (
                            <span className="hide-sm">
                              Follow
                            </span>
                          )}
                    </Button>
                  </Tooltip>
                )}
          </div>
        </div>
        <div className="panel-body">
          {props?.diveSitePics
          && props?.diveSitePics.map((packet, packetIndex) => {
            return (
              <div key={`${packet.dateTaken}-${packetIndex}`} className={style.panelBodyDiveSite}>
                <h2 className={`${style.panelDate} d-flex flex-column`}>
                  <span>
                    {packet.name}
                  </span>
                  <span>
                    {packet.dateTaken}
                  </span>
                </h2>
                {packet.photos
                && packet.photos.map((pic) => {
                  return (
                    <SeaLifeImageCard key={pic.id} pic={pic} isShowAuthor={false} />
                  );
                })}
              </div>
            );
          })}
          {props?.diveSitePics?.length === 0 && (
            <div>
              <p className="noSightings">
                {screenData.DiveSite.emptyDrawer}
              </p>
            </div>
          )}
        </div>
        {/* <div className="panel-footer"></div> */}
      </div>
    </div>
  );
}
