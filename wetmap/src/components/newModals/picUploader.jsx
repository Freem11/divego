import React, { useState, useContext, useEffect } from "react";
import screenData from "./screenData.json";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { TouchableWithoutFeedback as Toucher } from "react-native-gesture-handler";
// import moment from "moment";
// import WavyHeaderUploader from "./wavyHeaderUploader";
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
} from '../../cloudflareBucketCalls/cloudflareAWSCalls';
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
    if (
      pin.PicFile &&
      pin.PicDate.length > 0 &&
      pin.Animal.length > 0
    ) {
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
    <div style={{ width: "100%", height: "100%", backgroundColor: "pink"}}>
      <MaterialIcons
        name="chevron-left"
        size={30}
        color={"$themeWhite"}
        onPress={() => onClose()}
      />
      {pin.PicFile ? (
        <div style={null}>
          <MaterialIcons
            name="add-a-photo"
            size={30}
            color={"$themeWhite"}
            onPress={() => handleImageUpload()}
          />
        </div>
      ) : null}
      
      <div style={null}>

        <p style={null}>{screenData.PicUploader.header}</p>

        <div
          style={{
            marginBottom: '70%',
            width: '75%',
            alignItems: "center",
          }}
        >
          <div style={null}>
            <p style={null}>{screenData.PicUploader.whatLabel}</p>
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
            <p style={null}>{screenData.PicUploader.whenLabel}</p>
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
            <p style={null}>{screenData.PicUploader.whereLabel}</p>
            <TextInputField
              icon={"anchor"}
              inputValue={pin.siteName}
              placeHolderText={screenData.PicUploader.wherePlaceholder}
              secure={false}
            />
          </div>
        </div>

        <div style={null}>
          <div style={null} onClick={() => onSubmit()}>
            <p style={null}>{screenData.PicUploader.submitButton}</p>
            <MaterialIcons
                name="chevron-right"
                size={30}
                color={"$themeWhite"}
              />
          </div>
        </div>

      </div>

      {/* <WavyHeaderUploader
        customStyles={styles.svgCurve}
        image={pin.PicFile}
        setPin={setPin}
        pin={pin}
      ></WavyHeaderUploader>

      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleDatePickerConfirm}
        onCancel={hideDatePicker}
      /> */}
    </div>
  );
}
