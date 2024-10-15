import React, { useState, useContext, useEffect } from "react";
import screenData from "./screenData.json";
import style from "./modalContent.module.scss";
import LargeButton from "./largeButton";
import Button from "./button";

// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { TouchableWithoutFeedback as Toucher } from "react-native-gesture-handler";
// import moment from "moment";
import WavyHeaderUploader from "./wavyHeaderUploader";
import TextInputField from "./textInput";
// import AnimalAutoSuggest from "../autoSuggest/autoSuggest";
// import {
//   activeFonts,
//   colors,
//   fontSizes,
//   authenicationButton,
//   buttonText,
// } from "../styles";
import { PinContext } from "../contexts/staticPinContext";
import { UserProfileContext } from "../contexts/userProfileContext";
import { MaterialIcons } from "react-web-vector-icons";
import { insertPhotoWaits } from "../../supabaseCalls/photoWaitSupabaseCalls";
import {
  uploadphoto,
  removePhoto,
} from "../../cloudflareBucketCalls/cloudflareAWSCalls";
// import { chooseImageHandler } from "./imageUploadHelpers";
// import { ActiveConfirmationIDContext } from "../contexts/activeConfirmationIDContext";
// import { ConfirmationTypeContext } from "../contexts/confirmationTypeContext";
// import { ConfirmationModalContext } from "../contexts/confirmationModalContext";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

export default function PicUploader(props) {
  const {} = props;
  const { profile } = useContext(UserProfileContext);
  const { pin, setPin } = useContext(PinContext);
  // const { levelTwoScreen, setLevelTwoScreen } = useContext(
  //   LevelTwoScreenContext
  // );
  // const { setActiveConfirmationID } = useContext(ActiveConfirmationIDContext);
  // const { setConfirmationModal } = useContext(ConfirmationModalContext);
  // const { setConfirmationType } = useContext(ConfirmationTypeContext);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  // const showDatePicker = () => {
  //   Keyboard.dismiss();
  //   setDatePickerVisible(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisible(false);
  // };

  const handleDatePickerConfirm = (passedDate) => {
    let formattedDate = moment(passedDate).format("YYYY-MM-DD");
    if (passedDate > date) return;

    setPin({ ...pin, PicDate: formattedDate });
    hideDatePicker();
  };

  // const handleImageUpload = async () => {
  //   try {
  //     const image = await chooseImageHandler();
  //     if (image) {
  //       let uri = image.assets[0].uri;
  //       let extension = image.assets[0].uri.split(".").pop();
  //       const fileName = Date.now() + "." + extension;

  //       //create new photo file and upload
  //       let picture = await fetch(uri);
  //       picture = await picture.blob();
  //       await uploadphoto(picture, fileName);
  //       if (pin.PicFile !== null || pin.PicFile === "") {
  //         await removePhoto({
  //           filePath: `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/`,
  //           fileName: pin.PicFile.split("/").pop(),
  //         });
  //       }

  //       setPin({
  //         ...pin,
  //         PicFile: `animalphotos/public/${fileName}`,
  //       });
  //     }
  //   } catch (e) {
  //     console.log("error: Photo Selection Cancelled", e.message);
  //   }
  // };

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
        <div style={{ paddingTop: "25%" }}>
          <LargeButton
            altStyle={true}
            btnText={screenData.PicUploader.uploadButton}
            onClick={() => handleImageUpload()}
          />
        </div>
        {pin.PicFile ? (
          <div style={{ marginTop: "40%" }}>
            <MaterialIcons
              name="add-a-photo"
              size={30}
              color={"green"}
              onClick={() => handleImageUpload()}
            />
          </div>
        ) : null}
      </div>
      <div style={{ marginTop: "0%" }}>
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
            {/* <AnimalAutoSuggest
              pin={pin}
              setPin={setPin}
              inputValue={pin.Animal}
              icon={"shark"}
              placeHolderText={screenData.PicUploader.whatPlaceholder}
              secure={false}
              vectorIcon={"MaterialCommunityIcons"}
            /> */}
          </div>
          <div style={null}>
            <p className={style.inputLabels}>
              {screenData.PicUploader.whenLabel}
            </p>
            <div pointerEvents="none">
              <TextInputField
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
