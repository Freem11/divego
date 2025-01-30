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
//   isPartnerAccount:     boolean
//   headerPictureUrl:     string | null
};

export default function UserProfileView(props: userProfileViewProps) {
  return (
    <div className="cols mx-0 full-height">
      <div className="col-6">
        <WavyModalHeader
        //   image={props.headerPictureUrl || defaultHeaderPicture}
          image={defaultHeaderPicture}
          onClose={props.onClose}
        >
          <div className={style.buttonOpenPictureUpload}></div>

          {(props.isActiveProfile) && (
            <div className={style.buttonImageUpload}>
              <FileInput
                onFileChange={props.handleImageSelection}
                className="d-none"
              >
                <ButtonIcon
                  icon={<Icon name="camera-plus" />}
                  className="btn-lg"
                />
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
                <div>
                </div>
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
                  <Button className="btn-lg" onClick={props.handleFollow}>
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
                )}
          </div>
        </div>
        {/* <div className="panel-body">
          {props?.diveSitePics
          && props?.diveSitePics.map((packet) => {
            return (
              <div key={packet.dateTaken} className={style.panelBodyDiveSite}>
                <h2 className={style.panelDate}>{packet.dateTaken}</h2>
                {packet.photos
                && packet.photos.map((pic) => {
                  return (
                    <SeaLifeImageCard key={pic.id} pic={pic} />
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
        </div> */}
        {/* <div className="panel-footer"></div> */}
      </div>
    </div>
  );
}
