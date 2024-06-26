import React, { useState, useContext, useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";
import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import { SessionContext } from "../contexts/sessionContext";
import { PartnerModalContext } from "../contexts/partnerAccountRequestModalContext";
import { UserProfileContext } from "../contexts/userProfileContext";
import { createPartnerAccountRequest } from "../../supabaseCalls/partnerSupabaseCalls";
import "./partnerAccountRequestModal.css";
import CloseButton from "../closeButton/closeButton";
import InputBase from "@mui/material/InputBase";
// import InputField from "../reusables/textInputs";
// import SuccessModal from "./confirmationSuccessModal";
// import FailModal from "./confirmationCautionModal";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

export default function PartnerAccountRequestModal() {
  const { partnerModal, setPartnerModal } = useContext(PartnerModalContext);
  const { profile, setProfile } = useContext(UserProfileContext);
  const { activeSession, setActiveSession } = useContext(SessionContext);
  const [closeButtonState, setCloseButtonState] = useState(false);
  const [subButState, setSubButState] = useState(false);

  useEffect(() => {
    setFormValues({ ...formValues, UserId: activeSession.user.id });
  }, []);

  // const successBoxY = useSharedValue(scale(1200));
  // const failBoxY = useSharedValue(scale(1200));
  const successModalRef = useRef(null);
  const cautionModalRef = useRef(null);
  const [successModalYCoord, setSuccessModalYCoord] = useState(0);
  const [cautionModalYCoord, setCautionModalYCoord] = useState(0);

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

  const [formValues, setFormValues] = useState({
    WebsiteLink: "",
    BusinessName: "",
    Latitude: "",
    Longitude: "",
    UserId: null,
  });

  let WebsiteLinkVar = false;
  let BusinessNameVar = false;
  let LatVar = false;
  let LngVar = false;

  const [formValidation, setFormValidation] = useState({
    WebsiteLinkVal: false,
    BusinessNameVal: false,
    LatVal: false,
    LngVal: false,
  });

  const handleClose = () => {
    setFormValues({
      ...formValues,
      WebsiteLink: "",
      BusinessName: "",
      Latitude: "",
      Longitude: "",
    });
    setPartnerModal(false);
  };

  const handleSubmit = (formValues) => {
    if (formValues.WebsiteLink === "" || formValues.WebsiteLink === null) {
      WebsiteLinkVar = true;
    } else {
      WebsiteLinkVar = false;
    }

    if (formValues.BusinessName === "" || formValues.BusinessName === null) {
      BusinessNameVar = true;
    } else {
      BusinessNameVar = false;
    }

    if (
      formValues.Latitude === "" ||
      formValues.Latitude === null ||
      isNaN(formValues.Latitude)
    ) {
      LatVar = true;
    } else {
      LatVar = false;
    }

    if (
      formValues.Longitude === "" ||
      formValues.Longitude === null ||
      isNaN(formValues.Longitude)
    ) {
      LngVar = true;
    } else {
      LngVar = false;
    }

    setFormValidation({
      ...formValidation,
      WebsiteLinkVal: WebsiteLinkVar,
      BusinessNameVal: BusinessNameVar,
      LatVal: LatVar,
      LngVal: LngVar,
    });

    if (
      formValues.WebsiteLink === "" ||
      formValues.BusinessName === "" ||
      formValues.Latitude == "" ||
      isNaN(formValues.Latitude) ||
      formValues.Longitude == "" ||
      isNaN(formValues.Longitude)
    ) {
      failBoxY.value = withTiming(scale(-50));
      return;
    } else {
      createPartnerAccountRequest(formValues);
      successBoxY.value = withTiming(scale(-50));
    }
  };

  return (
    <div className="container">
      <div className="title">
        <Label className="header2">Partner Account Request</Label>
        <FormGroup>
          <CloseButton
            id="closeButton"
            onClick={handleClose}
            btnStyle={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          />
        </FormGroup>
      </div>

      {/* <Label className="explainer">
        To qualify for a "Partner Account" Your Account must represent a diving
        business that takes divers out diving. {"\n"} Examples include: Dive
        Shops, Dive Charters, Diver Centres and Liveaboards
      </Label> */}


      <div className="inputboxType2">
              <FormGroup>
                <InputBase
                  id="standard-basic"
                  placeholder="Full Business Name"
                  variant="standard"
                  type="text"
                  name="Full Business Name"
                  value={formValues.BusinessName}
                  onChange={(text) =>
                    setFormValues({ ...formValues, BusinessName: text })
                  }
                  inputProps={{
                    style: {
                      textAlign: "center",
                      fontFamily: "Itim",
                      fontSize: "1.5vw",
                      textOverflow: "ellipsis",
                      backgroundColor: "transparent",
                      height: "5vh",
                      width: "18vw",
                      color: "#F0EEEB",
                      borderBottom: "none",
                      borderColor: "transparent",
                      borderRadius: "20px",
                      boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                    },
                  }}
                />
              </FormGroup>
            </div>

      <Label className="explainerMicro">(For display purposes)</Label>

      <div className="inputboxType2">
              <FormGroup>
                <InputBase
                  id="standard-basic"
                  placeholder="Website URL"
                  variant="standard"
                  type="text"
                  name="Website URL"
                  value={formValues.WebsiteLink}
                  onChange={(text) =>
                    setFormValues({ ...formValues, WebsiteLink: text })
                  }
                  inputProps={{
                    style: {
                      textAlign: "center",
                      fontFamily: "Itim",
                      fontSize: "1.5vw",
                      textOverflow: "ellipsis",
                      backgroundColor: "transparent",
                      height: "5vh",
                      width: "18vw",
                      color: "#F0EEEB",
                      borderBottom: "none",
                      borderColor: "transparent",
                      borderRadius: "20px",
                      boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                    },
                  }}
                />
              </FormGroup>
            </div>

      <Label className="explainerMicro">(To validate your business)</Label>

      <div className="inputboxType2">
              <FormGroup>
                <InputBase
                  id="standard-basic"
                  placeholder="Latitude"
                  variant="standard"
                  type="decimal"
                  name="Latitude"
                  value={formValues.Latitude}
                  onChange={(text) =>
                    setFormValues({ ...formValues, Latitude: text })
                  }
                  inputProps={{
                    style: {
                      textAlign: "center",
                      fontFamily: "Itim",
                      fontSize: "1.5vw",
                      textOverflow: "ellipsis",
                      backgroundColor: "transparent",
                      height: "5vh",
                      width: "18vw",
                      color: "#F0EEEB",
                      borderBottom: "none",
                      borderColor: "transparent",
                      borderRadius: "20px",
                      boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                    },
                  }}
                />
              </FormGroup>
            </div>

            <div className="inputboxType2">
              <FormGroup>
                <InputBase
                  id="standard-basic"
                  placeholder="Longitude"
                  variant="standard"
                  type="decimal"
                  name="Longitude"
                  value={formValues.Longitude}
                  onChange={(text) =>
                    setFormValues({ ...formValues, Longitude: text })
                  }
                  inputProps={{
                    style: {
                      textAlign: "center",
                      fontFamily: "Itim",
                      fontSize: "1.5vw",
                      textOverflow: "ellipsis",
                      backgroundColor: "transparent",
                      height: "5vh",
                      width: "18vw",
                      color: "#F0EEEB",
                      borderBottom: "none",
                      borderColor: "transparent",
                      borderRadius: "20px",
                      boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                    },
                  }}
                />
              </FormGroup>
            </div>
      <Label className="explainerMicro">(For map placement)</Label>

      <div
        onClick={() => handleSubmit(formValues)}
        className="Logoutbutton"
      >
          <Label
            style={{
              color: "gold",
              fontSize: 26,
              marginTop: 4,
              marginBottom: -6,
              fontFamily: "PatrickHand_400Regular",
              width: "100%",
              alignSelf: "center",
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
            }}
          >
            Submit Account Request
          </Label>
      </div>

      {/* <animated.div style={sucessModalSlide} ref={successModalRef}>
        <SuccessModal
          submissionItem="partner account creation request"
          confirmationSucessClose={confirmationSucessClose}
          animateSuccessModal={animateSuccessModal}
        ></SuccessModal>
      </animated.div>

      <animated.div style={cautionModalSlide} ref={cautionModalRef}>
        <FailModal
          submissionItem="partner account creation request"
          animateCautionModal={animateCautionModal}
        ></FailModal>
      </animated.div> */}
    </div>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#538bdb",
//     // backgroundColor: 'green',
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: "5%",
//     marginBottom: "2%",
//     width: "98%",
//     marginLeft: 2,
//     minHeight: Platform.OS === "android" ? 490 : 0,
//   },
//   explainer: {
//     color: "#F0EEEB",
//     fontSize: moderateScale(14),
//     textAlign: "center",
//     margin: moderateScale(20),
//     marginTop: windowWidth > 500 ? 0 : moderateScale(-60),
//   },
//   explainerMicro: {
//     color: "#F0EEEB",
//     fontSize: moderateScale(12),
//     textAlign: "center",
//   },
//   title: {
//     position: "absolute",
//     top: "-1%",
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     alignContent: "center",
//     justifyContent: "center",
//     marginTop: "5%",
//     marginLeft: "12%",
//     width: "85%",
//     height: scale(30),
//   },
//   header2: {
//     flexWrap: "wrap",
//     fontFamily: "PatrickHand_400Regular",
//     fontSize: scale(24),
//     alignSelf: "center",
//     height: scale(70),
//     color: "#F0EEEB",
//     marginTop: "11%",
//     marginLeft: "7%",
//     marginRight: "10%",
//     // backgroundColor: "green"
//   },
//   closeButton: {
//     position: "relative",
//     borderRadius: scale(42 / 2),
//     height: scale(30),
//     width: scale(30),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   closeButtonPressed: {
//     position: "relative",
//     borderRadius: scale(42 / 2),
//     height: scale(30),
//     width: scale(30),
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "lightgrey",
//     opacity: 0.3,
//   },
//   SubmitButton: {
//     position: "absolute",
//     marginBottom: "0%",
//     borderTopWidth: 0.5,
//     width: "85%",
//     borderTopColor: "darkgrey",
//     borderBottomColor: "transparent",
//     bottom: Platform.OS === "android" ? "1%" : "1%",
//   },
//   SubmitButtonPressed: {
//     position: "absolute",
//     marginBottom: "0%",
//     borderTopWidth: 0.5,
//     width: "85%",
//     borderTopColor: "darkgrey",
//     borderBottomColor: "transparent",
//     bottom: Platform.OS === "android" ? "1%" : "1%",
//     backgroundColor: "#538dbd",
//   },
//   confirmationBox: {
//     position: "absolute",
//   },
// });
