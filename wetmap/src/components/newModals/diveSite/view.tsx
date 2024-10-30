import React, { useRef } from 'react';
import screenData from '../screenData.json';
// import style from '../modalContent.module.scss';
import style from './style.module.scss';
import Picture from '../../modals/picture';
import Button from '../button';
import WavyHeader from '../wavyHeader';
// import PlainTextInput from '../../newModals/plaintextInput';
import Icon from '../../../icons/Icon';
import defaultHeaderPicture from '../../../images/blackManta.png';
import { DiveSiteWithUserName } from '../../../entities/diveSite';
import { PhotosGroupedByDate } from '../../../entities/photos';
import PlainTextInput from '../../reusables/plainTextInput';

type DiveSiteViewProps = {
  onModalCancel:        () => void
  openPicUploader:      () => void
  handleImageSelection: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDiveSiteBioChange:  (newValue: string) => void
  diveSite:             DiveSiteWithUserName | null
  diveSitePics:         PhotosGroupedByDate[] | null
  isPartnerAccount:     boolean
  headerPictureUrl:     string | null
};

export default function DiveSiteView(props: DiveSiteViewProps) {
  const fileUploaderRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className="$themeWhite"
      style={{
        display:         'flex',
        width:           '100%',
        height:          '100%',
        backgroundColor: '$themeWhite',
        marginBottom:    '100%',
      }}
    >
      <div className="col-6">
        <div className={style.buttonBack}>
          <Icon
            name="chevron-left"
            fill="white"
            width="60px"
            onClick={props.onModalCancel}
          />
        </div>


        <div className={style.buttonOpenPictureUpload}>
          <Button
            onClick={props.openPicUploader}
            btnText={screenData.DiveSite.addSightingButton}
            altStyle={true}
            icon={false}
          />
        </div>

        <div className={`mb-4 ${style.pictureZone}`}>

          <img src={props.headerPictureUrl || defaultHeaderPicture} width="100%"></img>

          <input
            ref={fileUploaderRef}
            className="d-hide"
            type="file"
            onChange={props.handleImageSelection}
          >
          </input>
          <div className={style.buttonImageUpload}>
            <Icon
              name="camera-plus"
              fill="white"
              width="40px"
              onClick={() => fileUploaderRef?.current?.click?.()}
            />
          </div>
        </div>

        <div>
          <div className="container">
            <div className="layout-group">
              <div>
                <div className="d-flex">
                  <h1 className="mb-0">{props?.diveSite?.name}</h1>
                  <div>
                    <Icon
                      name="flag"
                      fill="maroon"
                      width="30px"
                      onClick={() => window.location = `mailto:DiveGo2022@gmail.com?subject=Reporting%20issue%20with%20Dive%20Site:%20"${selectedDiveSite.SiteName}"%20at%20Latitude:%20${selectedDiveSite.Latitude}%20Longitude:%20${selectedDiveSite.Longitude}&body=Type%20of%20issue:%0D%0A%0D%0A%0D%0A%0D%0A1)%20Dive%20site%20name%20not%20correct%0D%0A%0D%0A(Please%20provide%20correct%20dive%20site%20name%20and%20we%20will%20correct%20the%20record)%0D%0A%0D%0A%0D%0A%0D%0A2)%20Dive%20site%20GPS%20coordinates%20are%20not%20correct%0D%0A%0D%0A(Please%20provide%20a%20correct%20latitude%20and%20longitude%20and%20we%20will%20update%20the%20record)`}
                    />
                  </div>
                </div>

                <div className="d-flex">
                  {'Added by: '}
                  <a href="#">{props?.diveSite?.newusername}</a>
                </div>
              </div>


              <PlainTextInput
                placeHolder={`A little about ${props?.diveSite?.name}`}
                content={props?.diveSite?.divesitebio || ''}
                readOnly={!props?.isPartnerAccount}
                onSubmit={props?.onDiveSiteBioChange}
              />
            </div>
          </div>
        </div>

        <WavyHeader
          customStyles="50%"
        >
        </WavyHeader>
      </div>
      <div className="col-6 panel py-6">
        <h3>{screenData.DiveSite.drawerHeader}</h3>
        <div className="panel-body">
          {props?.diveSitePics?.map((packet) => {
            return (
              <div key={packet.dateTaken}>
                <div className="">{packet.dateTaken}</div>
                {packet.photos
                && packet.photos.map((pic) => {
                  return <Picture key={pic.id} pic={pic}></Picture>;
                })}
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
