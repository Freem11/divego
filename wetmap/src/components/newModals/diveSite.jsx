import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import WavyHeaderDynamic from "./wavyHeaderDynamic";
import PlainTextInput from "./plaintextInput";
// import {
//   activeFonts,
//   colors,
//   fontSizes,
//   screenSecondaryButton,
//   buttonTextAlt,
// } from "../styles";
import screenData from "./screenData.json";
import { PinContext } from "../contexts/staticPinContext";
import { UserProfileContext } from "../contexts/userProfileContext";
import { SelectedDiveSiteContext } from "../contexts/selectedDiveSiteContext";
import { AnimalMultiSelectContext } from "../contexts/animalMultiSelectContext";
import { MyCreaturesContext } from "../contexts/myCreaturesContext";
import { newGPSBoundaries } from "../helpers/mapHelpers";
import { chooseImageHandler } from "./imageUploadHelpers";
import { useButtonPressHelper } from "../FABMenu/buttonPressHelper";
import {
  uploadphoto,
  removePhoto,
} from "./../cloudflareBucketCalls/cloudflareAWSCalls";
import {
  getPhotosWithUser,
  getPhotosWithUserEmpty,
  getPhotosByDiveSiteWithExtra,
} from "../../supabaseCalls/photoSupabaseCalls";
import {
  getDiveSiteWithUserName,
  updateDiveSite,
} from "../../supabaseCalls/diveSiteSupabaseCalls";
import BottomDrawer from "./animatedBottomDrawer";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function DiveSite(props) {
  const {} = props;
  const { profile } = useContext(UserProfileContext);
  const { animalMultiSelection } = useContext(AnimalMultiSelectContext);
  const { myCreatures } = useContext(MyCreaturesContext);
  const { pinValues, setPinValues } = useContext(PinContext);
  const { selectedDiveSite } = useContext(SelectedDiveSiteContext);
  const { levelOneScreen, setLevelOneScreen } = useContext(
    LevelOneScreenContext
  );
  const { levelTwoScreen, setLevelTwoScreen } = useContext(
    LevelTwoScreenContext
  );

  const { activeScreen, setActiveScreen } = useContext(ActiveScreenContext);
  const { setPreviousButtonID } = useContext(PreviousButtonIDContext);
  const [diveSitePics, setDiveSitePics] = useState([]);
  const [site, setSite] = useState("");
  const [diveSiteVals, setDiveSiteVals] = useState({
    diveSitebio: null,
    diveSitePhoto: null,
  });
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [isPartnerAccount, setIsPartnerAccount] = useState(false);
  const drawerUpperBound = "90%";
  const drawerLowerBound = "30%";

  const getPhotos = async () => {
    const success = await getPhotosByDiveSiteWithExtra({
      lat: selectedDiveSite.Latitude,
      lng: selectedDiveSite.Longitude,
      userId: profile[0].UserID,
    });
    setDiveSitePics(success);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    getPhotos();
  }, [selectedDiveSite]);

  useEffect(() => {
    if (!isEditModeOn && site) {
      diveSiteUpdateUpdate();
    }
  }, [isEditModeOn]);

  const diveSiteUpdateUpdate = async () => {
    try {
      const success = await updateDiveSite({
        id: site.id,
        bio: site.divesitebio,
        photo: site.divesiteprofilephoto,
      });
    } catch (e) {
      console.log({ title: "Error19", message: e.message });
    }
  };

  useEffect(() => {
    getDiveSite(selectedDiveSite.SiteName);
    // filterAnchorPhotos();
  }, [selectedDiveSite]);

  useEffect(() => {
    if(profile[0].partnerAccount){
      setIsPartnerAccount(true)
    }

    getDiveSite(selectedDiveSite.SiteName);
    // filterAnchorPhotos();
  }, []);

  const getDiveSite = async () => {
    try {
      const selectedSite = await getDiveSiteWithUserName({
        siteName: selectedDiveSite.SiteName,
        lat: selectedDiveSite.Latitude,
        lng: selectedDiveSite.Longitude,
      });
      if (selectedSite.length > 0) {
        setSite(selectedSite[0]);
      }
    } catch (e) {
      console.log({ title: "Error98", message: e.message });
    }
  };

  const filterAnchorPhotos = async () => {
    let { minLat, maxLat, minLng, maxLng } = newGPSBoundaries(
      selectedDiveSite.Latitude,
      selectedDiveSite.Longitude
    );

    try {
      let photos;
      if (animalMultiSelection.length === 0) {
        photos = await getPhotosWithUserEmpty({
          myCreatures,
          userId: profile[0].UserID,
          minLat,
          maxLat,
          minLng,
          maxLng,
        });
      } else {
        photos = await getPhotosWithUser({
          animalMultiSelection,
          myCreatures,
          userId: profile[0].UserID,
          minLat,
          maxLat,
          minLng,
          maxLng,
        });
      }

      if (photos) {
        // photos.unshift({ id: 0 });
        setDiveSitePics(photos);
        let count = 0;
        photos.forEach((obj) => {
          count++;
        });
      }
    } catch (e) {
      console.log({ title: "Error55", message: e.message });
    }
  };

  const handleImageUpload = async () => {
    try {
      const image = await chooseImageHandler();
      if (image) {
        let uri = image.assets[0].uri;
        let extension = image.assets[0].uri.split(".").pop();
        const fileName = Date.now() + "." + extension;

        //create new photo file and upload
        let picture = await fetch(uri);
        picture = await picture.blob();
        await uploadphoto(picture, fileName);
        if (
          site.divesiteprofilephoto !== null ||
          site.divesiteprofilephoto === ""
        ) {
          await removePhoto({
            filePath: `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/`,
            fileName: site.divesiteprofilephoto.split("/").pop(),
          });
        }

        setSite({
          ...site,
          photo: `animalphotos/public/${fileName}`,
        });
        const success = await updateDiveSite({
          id: site.id,
          bio: site.divesitebio,
          photo: `animalphotos/public/${fileName}`,
        });
      }
    } catch (e) {
      console.log("error: Photo Selection Cancelled", e.message);
    }
  };

  const handleEmailDS = () => {
    const to = ["scubaseasons@gmail.com"];
    email(to, {
      // Optional additional arguments
      subject: `Reporting issue with Dive Site: "${site.name}" at Latitude: ${site.lat} Longitude: ${site.lng} `,
      body:
        "Type of issue: \n \n 1) Dive Site name not correct \n (Please provide the correct dive site name and we will correct the record)\n \n 2)Dive Site GPS Coordinates are not correct \n (Please provide a correct latitude and longitude and we will update the record)",
      checkCanOpen: false, // Call Linking.canOpenURL prior to Linking.openURL
    }).catch(console.error);
  };

  const onClose = () => {
    setLevelOneScreen(false);
  };

  const openPicUploader = () => {
    setPinValues({
      ...pinValues,
      Latitude: String(selectedDiveSite.Latitude),
      Longitude: String(selectedDiveSite.Longitude),
      siteName: selectedDiveSite.SiteName,
    });
    setLevelOneScreen(false);
    setPreviousButtonID(activeScreen);
    setActiveScreen("PictureUploadScreen");
    useButtonPressHelper(
      "PictureUploadScreen",
      activeScreen,
      levelTwoScreen,
      setLevelTwoScreen
    );
  };

  return (
    <div style={styles.container}>
      <MaterialIcons
        name="chevron-left"
        size={moderateScale(48)}
        color={colors.themeWhite}
        onPress={() => onClose()}
        style={styles.backButton}
      />
        <div style={styles.contributeButton} onClick={openPicUploader}>
  <p style={styles.contributeButtonText}>{screenData.DiveSite.addSightingButton}</p>
        </div>

      {profile[0].partnerAccount && (
        <div style={styles.addPhotoButton}>
          <MaterialIcons
            name="add-a-photo"
            size={moderateScale(30)}
            color={colors.themeWhite}
            onPress={() => handleImageUpload()}
          />
        </div>
      )}

      <div style={styles.contentContainer}>
        <div style={styles.siteNameContainer}>
          <p style={styles.header}>{site.name}</p>

          <FontAwesome
            name="flag"
            color="maroon"
            size={moderateScale(16)}
            style={{ marginTop: "5%", marginLeft: moderateScale(10) }}
            onPress={() => handleEmailDS()}
          />
        </div>
        <p style={styles.contributor}>Added by: {site.newusername}</p>
        <MaskedView
          maskElement={
            <LinearGradient
              style={{ flex: 1 }}
              colors={["white", "transparent"]}
              start={{ x: 0.5, y: 0.7 }}
            ></LinearGradient>
          }
        >
          <div style={styles.scrolldivBox}>
            <ScrollView>
              {site && (
                <PlainTextInput
                  placeHolder={`A little about ${site.name}`}
                  content={site.divesitebio}
                  fontSz={fontSizes.StandardText}
                  isPartnerAccount={isPartnerAccount}
                  isEditModeOn={isEditModeOn}
                  setIsEditModeOn={setIsEditModeOn}
                  onChangeText={(bioText) =>
                    setSite({ ...site, divesitebio: bioText })
                  }
                />
              )}
            </ScrollView>
          </div>
        </MaskedView>
      </div>

      <WavyHeaderDynamic
        customStyles={styles.svgCurve}
        image={site && site.divesiteprofilephoto}
      ></WavyHeaderDynamic>

      <BottomDrawer
        dataSet={diveSitePics}
        dataSetType={"DiveSitePhotos"}
        lowerBound={drawerLowerBound}
        upperBound={drawerUpperBound}
        drawerHeader={screenData.DiveSite.drawerHeader}
        emptyDrawer={screenData.DiveSite.emptyDrawer}
      />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight,
  },
  contentContainer: {
    alignItems: "left",
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    marginTop: Platform.OS === "ios" ? windowHeight / 2.4 : windowHeight / 2.2,
    width: "100%",
    height: 300,
    // backgroundColor: "pink",
  },
  siteNameContainer: {
    // zIndex: 1,
    flexDirection: "row",
    width: "auto",
    marginTop: Platform.OS === "ios" ? windowHeight / 50 : windowHeight / 50,
    marginLeft: "8%",
  },
  header: {
    // zIndex: 50,
    marginTop: "5%",
    fontSize: moderateScale(fontSizes.Header),
    fontFamily: activeFonts.Regular,
    color: colors.themeBlack,
  },
  contributor: {
    // zIndex: 50,
    fontSize: moderateScale(fontSizes.SmallText),
    fontFamily: activeFonts.Thin,
    color: colors.themeBlack,
    marginLeft: "12%",
  },
  scrollViewBox: {
    // zIndex: 5,
    marginTop: "3%",
    marginLeft: "2%",
    height: windowHeight / 6,
    // backgroundColor: "green"
  },
  screenCloseButton: [
    { zIndex: 1, position: "absolute", top: "6%", right: "5%" },
  ],
  contributeButton: [
    { zIndex: 10, position: "absolute", top: "6%", right: "3%" },
    screenSecondaryButton,
  ],
  backButton: [{ zIndex: 10, position: "absolute", top: "5.5%", left: "2%" }],
  contributeButtonText: [buttonTextAlt, { marginHorizontal: moderateScale(5) }],
  addPhotoButton: [
    { zIndex: 10, position: "absolute", top: "32%", right: "5%" },
  ],
  svgCurve: {
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("window").width,
  },
  page: {
    position: "absolute",
    zIndex: 1,
    // bottom: -200,
    width: "100%",
    // marginLeft: "1%",
    // marginTop: -windowHeight,
    height: "100%",
  },
  pageContainer: {
    // pointerEvents: "none",
    // justifyContent: "center",
    position: "absolute",
    // top: 0,
    // left: "5%",
    // backgroundColor: "yellow",
  },
  gapBox: { pointerEvents: "none", height: windowHeight * 0.75 },
  shadowbox: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,

    elevation: 10,
  },
});
