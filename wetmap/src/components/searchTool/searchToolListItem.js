import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
} from "react-native";
import { activeFonts, colors, fontSizes } from "../styles";
import Geocoder from "react-native-geocoding";
import { moderateScale } from "react-native-size-matters";
import { LevelOneScreenContext } from "../contexts/levelOneScreenContext";
import { MapCenterContext } from "../contexts/mapCenterContext";
import { PinSpotContext } from "../contexts/pinSpotContext";
import { SelectedDiveSiteContext } from "../contexts/selectedDiveSiteContext";
import { getSingleDiveSiteByNameAndRegion } from "../../supabaseCalls/diveSiteSupabaseCalls";

let GoogleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export default SearchToolListItem = (props) => {
  const {
    setList,
    key,
    name,
    soureImage,
    setSearchValue,
    setTextSource,
  } = props;
  const { setMapCenter } = useContext(MapCenterContext);
  const { setDragPin } = useContext(PinSpotContext);
  const { setSelectedDiveSite } = useContext(SelectedDiveSiteContext);
  const { setLevelOneScreen } = useContext(LevelOneScreenContext);

  Geocoder.init(GoogleMapsApiKey);

  const handleMapOptionSelected = async (place) => {
    Geocoder.from(place)
      .then((json) => {
        var location = json.results[0].geometry.location;
        setMapCenter({
          lat: location.lat,
          lng: location.lng,
        });
        setDragPin({
          lat: location.lat,
          lng: location.lng,
        });
        setList([]);
        setTextSource(false);
        setSearchValue("");
        Keyboard.dismiss();
        setLevelOneScreen(false);
      })
      .catch((error) => console.warn(error));
  };

  const handleDiveSiteOptionSelected = async (diveSite) => {
    if (diveSite !== null) {
      let nameOnly = diveSite.split(" ~ ");
      let diveSiteSet = await getSingleDiveSiteByNameAndRegion({
        name: nameOnly[0],
        region: nameOnly[1],
      });

      if (diveSiteSet) {
        setSelectedDiveSite({
          SiteName: diveSiteSet[0].name,
          Latitude: diveSiteSet[0].lat,
          Longitude: diveSiteSet[0].lng,
        });
        setDragPin({
          lat: diveSiteSet[0].lat,
          lng: diveSiteSet[0].lng,
        });
      }
      setList([]);
      setTextSource(false);
      setSearchValue("");
      Keyboard.dismiss();
      setLevelOneScreen(false);
    }
  };
  return (
    <View id={name} key={key} style={styles.suggestion}>
      <View style={{ paddingLeft: moderateScale(8), justifyContent: "center" }}>
        <TouchableWithoutFeedback
          onPress={() =>
            soureImage === "anchor"
              ? handleDiveSiteOptionSelected(name)
              : handleMapOptionSelected(name)
          }
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <View style={styles.searchCard}>
            {soureImage === "anchor" ? (
              <View style={styles.logoHousing}>
                <Image
                  style={styles.logo}
                  source={require("../png/mapIcons/AnchorBlueA.png")}
                ></Image>
              </View>
            ) : (
              <View style={styles.logoHousing}>
                <Image
                  style={styles.logo}
                  source={require("../png/compass.png")}
                ></Image>
              </View>
            )}
            <View style={styles.textHousing}>
              <Text
                style={{
                  fontFamily: activeFonts.Medium,
                  fontSize: moderateScale(fontSizes.StandardText),
                  textAlign: "left",
                  color: colors.themeBlack,
                  width: "86%",
                  overflow: "scroll",
                }}
              >
                {name}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  suggestion: {
    height: moderateScale(55),
    width: "100%",
    backgroundColor: colors.themeWhite,
    borderWidth: moderateScale(1),
    borderColor: "darkgrey",
    borderRadius: moderateScale(10),
    textAlign: "center",
    justifyContent: "center",
    listStyle: "none",
  },
  searchCard: {
    flexDirection: "row",
    alignContent: "center",
  },
  logoHousing: {
    height: moderateScale(55),
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    paddingLeft: moderateScale(20),
    marginRight: moderateScale(10),
    height: moderateScale(20),
    width: moderateScale(20),
    marginTop: moderateScale(2),
  },
  textHousing: {
    height: moderateScale(55),
    width: "100%",
    //alignItems: 'center',
    justifyContent: "center",
  },
});
