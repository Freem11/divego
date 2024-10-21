import React, { useState, useContext, useEffect } from "react";
import screenData from "./screenData.json";
import style from "./modalContent.module.scss";
import LargeButton from "./largeButton";
import Button from "./button";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { TouchableWithoutFeedback as Toucher } from "react-native-gesture-handler";
// import moment from "moment";
import WavyHeaderUploader from "./wavyHeaderUploader";
import TextInputField from "../newModals/textInput";
import AutoSuggest from "../autoSuggest/autoSuggest";
import { PinContext } from "../contexts/staticPinContext";
import { UserProfileContext } from "../contexts/userProfileContext";
import { MaterialIcons } from "react-web-vector-icons";
import { insertPhotoWaits } from "../../supabaseCalls/photoWaitSupabaseCalls";
import {
  uploadphoto,
  removePhoto,
} from "../../cloudflareBucketCalls/cloudflareAWSCalls";
import { handleImageUpload, clearPreviousImage } from "./imageUploadHelpers";
// import { ActiveConfirmationIDContext } from "../contexts/activeConfirmationIDContext";
// import { ConfirmationTypeContext } from "../contexts/confirmationTypeContext";
// import { ConfirmationModalContext } from "../contexts/confirmationModalContext";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

export default function PicUploader(props) {
  const {} = props;
  const { profile } = useContext(UserProfileContext);
  const { pin, setPin } = useContext(PinContext);
  const [picUrl, setPicUrl] = useState(null);

  // const { levelTwoScreen, setLevelTwoScreen } = useContext(
  //   LevelTwoScreenContext
  // );
  // const { setActiveConfirmationID } = useContext(ActiveConfirmationIDContext);
  // const { setConfirmationModal } = useContext(ConfirmationModalContext);
  // const { setConfirmationType } = useContext(ConfirmationTypeContext);

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
        Latitude: "",
        Longitude: "",
        DDVal: "0",
      });
      setConfirmationType("Sea Creature Submission");
      setActiveConfirmationID("ConfirmationSuccess");
      setConfirmationModal(true);
    } else {
      setActiveConfirmationID("ConfirmationCaution");
      setConfirmationModal(true);
    }
  };

  const onClose = async () => {
    if (pin.PicFile !== null || pin.PicFile === "") {
      await removePhoto({
        filePath: `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/`,
        fileName: pin.PicFile.split("/").pop(),
      });
    }
    // setLevelTwoScreen(false);
    setPin({
      ...pin,
      PicFile: null,
      Animal: "",
      PicDate: "",
      Latitude: "",
      Longitude: "",
      DDVal: "0",
    });
  };

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
          <img
            src={picUrl}
            width={"100%"}
            className={style.picStyles}
          ></img>
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
            // onClick={e => handleNoGPSClose(e)}
          ></Input>
        </FormGroup>

        {picUrl ? (
          <div style={{ position: 'absolute', right: '5%',  marginTop: "40%" }}>
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

        <div className={style.submitZone}>
          <Button
            onClick={() => onSubmit()}
            btnText={screenData.PicUploader.submitButton}
            icon={true}
          />
        </div>
      </div>

      <WavyHeaderUploader
        customStyles={{ position: "absolute", bottom: 500, width: "100%" }}
        image={pin.PicFile}
        setPin={setPin}
        pin={pin}
      ></WavyHeaderUploader>

      {/* <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleDatePickerConfirm}
        onCancel={hideDatePicker}
      />  */}
    </div>
  );
}
