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
import { ActiveProfile } from '../../../entities/profile';
import FileInput from '../../reusables/fileInput';
import Tooltip from '../../reusables/tooltip';
import SeaLifeImageCardList from '../../reusables/seaLifeCardList';

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
  diveSitePics:            PhotosGroupedByDate[]
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-6 panel border-none full-height">
        <div className={style.panelHeader}>
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
        <SeaLifeImageCardList diveSitePics={props.diveSitePics} onUserProfile={true} />
      </div>
    </div>
  );
}
