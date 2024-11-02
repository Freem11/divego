import React, { useRef } from 'react';
import backGroundPic from '../../../images/boat.png';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import screenData from '../screenData.json';
import { useForm } from 'react-hook-form';
import TextInput from '../../reusables/textInput';
import Icon from '../../../icons/Icon';


type SiteSubmitterProps = {
  onSubmit: (data: any) => void
};

export default function SiteSubmitterView(props: SiteSubmitterProps) {
  const { register, handleSubmit } = useForm();
  return (
    <>
      <WavyModalHeader image={backGroundPic} />
      <div className="mx-6">
        <div className="d-flex">
          <h1 className="mb-0">{screenData.DiveSiteAdd.header}</h1>
        </div>

        <form className="hero" onSubmit={handleSubmit(props.onSubmit)}>
          <div className="hero-body">
            <TextInput
              iconLeft={<Icon name="diving-scuba-flag" />}
              placeholder={screenData.DiveSiteAdd.siteNamePlaceholder}
              {...register('name')}
            // icon="diving-scuba-flag"
            // inputValue={addSiteVals.Site}
            // placeHolderText={screenData.DiveSiteAdd.siteNamePlaceholder}
            // secure={false}
            // onChangeText={handleChange}
            />
          </div>
          <div className="hero-body">
            <TextInput
              iconLeft={<Icon name="latitude" />}
              {...register('latitude')}
            // icon="latitude"
            // inputValue={addSiteVals.Latitude}
            // placeHolderText={screenData.DiveSiteAdd.latPlaceholder}
            // secure={false}
            // onChangeText={handleChange}
            />
          </div>
          <div className="hero-body">
            <TextInput
              iconLeft={<Icon name="longitude" />}
              {...register('longitude')}
            // icon="longitude"
            // inputValue={addSiteVals.Longitude}
            // placeHolderText={screenData.DiveSiteAdd.lngPlaceholder}
            // secure={false}
            // onChangeText={handleChange}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    </>
  );


  const fileUploaderRef = useRef<HTMLInputElement>(null);
  return (
    <div className="cols mx-0 full-height">
      <input
        ref={fileUploaderRef}
        className="d-hide"
        type="file"
        onChange={props.handleImageSelection}
      />

      <div className="col-6">

        <WavyModalHeader image={props.headerPictureUrl || defaultHeaderPicture}>
          <div className={style.buttonOpenPictureUpload}>
            <Button
              // iconLeft={<Icon name="camera-plus" />}
              iconRight={<Icon name="camera-plus" />}
              className="btn-lg"
              onClick={props.openPicUploader}
            >
              <span className="hide-sm">{screenData.DiveSite.addSightingButton}</span>
            </Button>
          </div>

          <div className={style.buttonImageUpload}>
            <ButtonIcon
              icon={<Icon name="camera-plus" />}
              className="btn-lg"
              onClick={() => fileUploaderRef?.current?.click?.()}
            />
          </div>
        </WavyModalHeader>

        <div className="ml-6">
          <div className="stack-4">
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

            <div className="panel border-none">
              <div className="panel-body">
                <PlainTextInput
                  placeHolder={`A little about ${props?.diveSite?.name}`}
                  content={props?.diveSite?.divesitebio || ''}
                  readOnly={!props?.isPartnerAccount}
                  onSubmit={props?.onDiveSiteBioChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-6 panel border-none full-height">
        <div className="panel-header">
          <h3>{screenData.DiveSite.drawerHeader}</h3>
        </div>
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
        <div className="panel-footer"></div>
      </div>
    </div>
  );
}
