import React, { useState, useContext, useEffect, useRef } from "react";
import screenData from "./screenData.json";
import style from "./modalContent.module.scss";
import LargeButton from "./largeButton";
import Button from "./button";
import { FormGroup, Input } from "reactstrap";
import WavyHeader from "./wavyHeader";
import TextInputField from "../newModals/textInput";
import AutoSuggest from "../autoSuggest/autoSuggest";
import { PinContext } from "../contexts/staticPinContext";
import { UserProfileContext } from "../contexts/userProfileContext";
import { MaterialIcons } from "react-web-vector-icons";
import { insertPhotoWaits } from "../../supabaseCalls/photoWaitSupabaseCalls";
import { handleImageUpload, clearPreviousImage } from "./imageUploadHelpers";
import ConfirmationModal from "../modals/confirmationModal";
import { animated, useSpring } from "react-spring";
import { ModalContext } from "../contexts/modalContext.jsx";

const screenWidthInital = window.innerWidth;
const screenHeitghInital = window.innerHeight;

export default function PicUploader(props) {
  const {} = props;
  const { profile } = useContext(UserProfileContext);
  const { pin, setPin } = useContext(PinContext);
  const [picUrl, setPicUrl] = useState(null);

  const successModalRef = useRef(null);
  const cautionModalRef = useRef(null);
  const [successModalYCoord, setSuccessModalYCoord] = useState(0);
  const [cautionModalYCoord, setCautionModalYCoord] = useState(0);
  const { modalPause } = useContext(ModalContext);

  const sucessModalSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${successModalYCoord}px,0)` },
  });

  const cautionModalSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${cautionModalYCoord}px,0)` },
  });

  const animateSuccessModal = () => {
    if (successModalYCoord === 0) {
      setSuccessModalYCoord(-windowHeight);
    } else {
      setSuccessModalYCoord(0);
    }
  };

  const animateCautionModal = () => {
    if (cautionModalYCoord === 0) {
      setCautionModalYCoord(-windowHeight);
    } else {
      setCautionModalYCoord(0);
    }
  };

  function handleClick() {
    document.getElementById("file").click();
  }

  const handleImageSelection = async (e) => {
    if (e.target && e.target.name === "PicFile") {
      if (pin.PicFile !== null) {
        clearPreviousImage(pin.PicFile);
      }

      const createFileName = await handleImageUpload(e);
      setPin({
        ...pin,
        PicFile: `animalphotos/public/${createFileName}`,
      });
    }
  };

  useEffect(() => {
    if (pin.PicFile) {
      let photoName = pin.PicFile.split("/").pop();
      setPicUrl(
        import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_PATH + `${photoName}`
      );
    } else {
      setPicUrl(null);
    }
  }, [pin.PicFile]);

  const onSubmit = async () => {
    if (pin.PicFile && pin.PicDate.length > 0 && pin.Animal.length > 0) {
      insertPhotoWaits(pin);
      setPin({
        ...pin,
        PicFile: null,
        Animal: "",
        PicDate: "",
      });
      setPicUrl(null);
      animateSuccessModal();
    } else {
      animateCautionModal();
    }
  };

  const onClose = async () => {
    if (pin.PicFile !== null || pin.PicFile === "") {
      await clearPreviousImage(pin.PicFile);
    }
    // setLevelTwoScreen(false);
    setPin({
      ...pin,
      PicFile: null,
      Animal: "",
      PicDate: "",
      Latitude: "",
      Longitude: "",
      siteName: "",
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
        width: "100%",
        height: "100%",
        backgroundColor: "$themeWhite",
        marginBottom: "100%",
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

      <div className={style.picZone}>
        {picUrl ? (
          <img src={picUrl} width={"100%"} className={style.picStyles}></img>
        ) : (
          <div style={{ paddingTop: "25%" }}>
            <LargeButton
              altStyle={true}
              btnText={screenData.PicUploader.uploadButton}
              onClick={() => handleClick()}
            />
          </div>
        )}

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
            name="PicFile"
            bsSize="lg"
            onChange={handleImageSelection}
          ></Input>
        </FormGroup>

        {picUrl ? (
          <div style={{ position: "absolute", right: "5%", marginTop: "40%" }}>
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
        }}
      >
        <div style={{ height:400, width: '100%',  marginLeft: "5%", marginBottom: "5%", overflowY: 'auto'}}>
          <p className={style.headerText}>{screenData.PicUploader.header}</p>

          <div
            style={{
              marginBottom: "20%",
              width: "75%",
              alignItems: "center",
            }}
          >
            <div style={null}>
              <p className={style.inputLabels}>
                {screenData.PicUploader.whatLabel}
              </p>
              <AutoSuggest
                pin={pin}
                setPin={setPin}
                inputValue={pin.Animal}
                icon={"shark"}
                placeHolderText={screenData.PicUploader.whatPlaceholder}
                vectorIcon={"MaterialCommunityIcons"}
              />
            </div>
            <div style={null}>
              <p className={style.inputLabels}>
                {screenData.PicUploader.whenLabel}
              </p>
              <div pointerEvents="none">
                <TextInputField
                  dataType="date"
                  icon={"calendar-month-outline"}
                  inputValue={pin.PicDate}
                  placeHolderText={screenData.PicUploader.whenPlaceholder}
                  secure={false}
                  vectorIcon={"MaterialCommunityIcons"}
                />
              </div>
            </div>
            <div style={null}>
              <p className={style.inputLabels}>
                {screenData.PicUploader.whereLabel}
              </p>
              <TextInputField
                dataType="text"
                icon={"anchor"}
                inputValue={pin.siteName}
                placeHolderText={screenData.PicUploader.wherePlaceholder}
                secure={false}
              />
            </div>
          </div>
        </div>

        <div className={style.submitZone}>
          <Button
            onClick={() => onSubmit()}
            btnText={screenData.PicUploader.submitButton}
            icon={true}
          />
        </div>
      </div>

      <WavyHeader
        customStyles={"100%"}
        image={pin.PicFile}
        setPin={setPin}
        pin={pin}
      ></WavyHeader>

      <animated.div
        className="successModal modalBase"
        style={sucessModalSlide}
        ref={successModalRef}
      >
        <ConfirmationModal
          submissionItem="sea creature submission"
          animateModal={animateSuccessModal}
          // handleClose={handleModalClose}
          isSuccess={true}
        />
      </animated.div>

      <animated.div
        className="cautionModal modalBase"
        style={cautionModalSlide}
        ref={cautionModalRef}
      >
        <ConfirmationModal
          submissionItem="sea creature submission"
          animateModal={animateCautionModal}
          isSuccess={false}
        />
      </animated.div>
    </div>
  );
}
