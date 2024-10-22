import React, { useState, useContext, useEffect, useRef } from "react";
import screenData from "./screenData.json";
import style from "./modalContent.module.scss";
import LargeButton from "./largeButton";
import Button from "./button";
import { FormGroup, Input } from "reactstrap";
import WavyHeader from "./wavyHeader";
import TextInputField from "../newModals/textInput";
import PlainTextInput from '../newModals/plaintextInput';
import { PinContext } from "../contexts/staticPinContext";
import { UserProfileContext } from "../contexts/userProfileContext";
import { MaterialIcons } from "react-web-vector-icons";
import {
  getPhotosWithUser,
  getPhotosWithUserEmpty,
  getPhotosByDiveSiteWithExtra,
} from "../../supabaseCalls/photoSupabaseCalls";
import { handleImageUpload, clearPreviousImage } from "./imageUploadHelpers";
import defaultImage from "../../images/blackManta.png";

const screenWidthInital = window.innerWidth;
const screenHeitghInital = window.innerHeight;

export default function DiveSite(props) {
  const {} = props;
  const { profile } = useContext(UserProfileContext);
  const [site, setSite] = useState("");
  const [picUrl, setPicUrl] = useState(defaultImage);

  function handleClick() {
    document.getElementById("file").click();
  }

  const handleImageSelection = async (e) => {
    if (e.target && e.target.name === "picFile") {
      if (site.photo !== null) {
        clearPreviousImage(site.photo);
      }

      const createFileName = await handleImageUpload(e);
      setSite({
        ...site,
        photo: `animalphotos/public/${createFileName}`,
      });
    }
  };

  useEffect(() => {
    if (site.photo) {
      let photoName = site.photo.split("/").pop();
      setPicUrl(
        import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_PATH + `${photoName}`
      );
    } else {
      setPicUrl(null);
    }
  }, [site.photo]);

  const onClose = async () => {
    if (site.photo !== null || site.photo === "") {
      await clearPreviousImage(site.photo);
    }
    // setLevelTwoScreen(false);
    setSite({
      ...site,
      photo: null,
    });
  };

  window.addEventListener("resize", trackDimensions);

  const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  const [windowHeight, setWindowHeigth] = useState(screenHeitghInital);

  function trackDimensions() {
    setWindowWidth(window.innerWidth);
    setWindowHeigth(window.innerHeight);
  }

  return (
    <div
      className="$themeWhite"
      style={{
        display: 'flex',
        width: "100%",
        height: "100%",
        backgroundColor: "$themeWhite",
        marginBottom: "100%",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "100%",
        }}
      >
        <div className={style.backButton} style={{ position: "absolute" }}>
          <MaterialIcons
            name="chevron-left"
            size={30}
            color={"$themeWhite"}
            onClick={() => onClose()}
          />
        </div>

        <div className={style.picZoneHalf} 
        // style={{backgroundImage: `url(${defaultImage})`}}
        >
          {/* {picUrl ? 
            <img src={picUrl} width={"100%"} className={style.picStylesHalf}></img>
            :
            <img src={defaultImage} width={"100%"} className={style.picStylesHalf}></img>
          } */}
          

          <FormGroup>
            <Input
              placeholder="Upload"
              className="modalInputs2"
              style={{
                textAlign: "center",
                display: "none",
              }}
              id="file"
              type="file"
              name="picFile"
              bsSize="lg"
              onChange={handleImageSelection}
            ></Input>
          </FormGroup>

          {picUrl ? (
            <div
              style={{ position: "absolute", right: "5%", marginTop: "40%" }}
            >
              <MaterialIcons
                name="add-a-photo"
                size={30}
                color={"white"}
                onClick={() => handleClick()}
              />
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "5%",
            marginRight: "5%",
            height: "50%",
            zIndex: 22,
            // marginTop: '-10%'
          }}
        >
          <div
            style={{
              height: 400,
              width: "100%",
              marginLeft: "5%",
              marginBottom: "5%",
              overflowY: "auto",
              // zIndex: 2
            }}
          >
            <p className={style.headerText}>{screenData.PicUploader.header}</p>

            <div
              style={{
                marginBottom: "20%",
                width: "75%",
                alignItems: "center",
                // zIndex: 2
              }}
            >
              <div style={null}>
                <p className={style.inputLabels}>
                  {screenData.PicUploader.whenLabel}
                </p>
                  <PlainTextInput
                    placeHolder={`A little about ${site.name}`}
                    content={site.divesitebio}
                    onChangeText={(bioText) =>
                      setSite({ ...site, divesitebio: bioText })
                    }
                  />
              </div>
              <div style={null}>
                <p className={style.inputLabels}>
                  {screenData.PicUploader.whereLabel}
                </p>
                <TextInputField
                  dataType="text"
                  icon={"anchor"}
                  inputValue={null}
                  placeHolderText={screenData.PicUploader.wherePlaceholder}
                  secure={false}
                />
              </div>
            </div>
          </div>
        </div>

        <WavyHeader
          customStyles={'50%'}
          image={site.photo}
          setPin={setSite}
          pin={site}
        ></WavyHeader>
      </div>
      <div
        style={{
          width: "50%",
          height: "100%",
        }}
      >

        <p>HI</p>
        </div>
    </div>
  );
}
