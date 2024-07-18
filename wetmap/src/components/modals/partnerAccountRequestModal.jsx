import React, { useState, useContext, useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";
import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import { SessionContext } from "../contexts/sessionContext";
import { PartnerModalContext } from "../contexts/partnerAccountRequestModalContext";
import { UserProfileContext } from "../contexts/userProfileContext";
import { createPartnerAccountRequest } from "../../supabaseCalls/partnerSupabaseCalls";
import "./partnerAccountRequestModal.css";
import "./confirmationModal.css";
import CloseButton from "../closeButton/closeButton";
import InputField from "../reusables/inputField";
import ConfirmationModal from "./confirmationModal";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

export default function PartnerAccountRequestModal() {
  const { partnerModal, setPartnerModal } = useContext(PartnerModalContext);
  const { profile, setProfile } = useContext(UserProfileContext);
  const { activeSession, setActiveSession } = useContext(SessionContext);
  const [closeButtonState, setCloseButtonState] = useState(false);

  let screenWidthInital = window.innerWidth;
  let screenHeigthInital = window.innerHeight;
  const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  const [windowHeight, setWindowHeight] = useState(screenHeigthInital);

  window.addEventListener("resize", trackScreen);

  function trackScreen() {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }

  useEffect(() => {
    setFormValues({ ...formValues, UserId: activeSession.user.id });
  }, []);

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
      animateCautionModal();
      return;
    } else {
      createPartnerAccountRequest(formValues);
      animateSuccessModal();
    }
  };

  return (
    <div className="containerP">
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

      <Label className="explainer">
        To qualify for a "Partner Account" Your Account must represent a diving
        business that takes divers out diving. {"\n"} Examples include: Dive
        Shops, Dive Charters, Diver Centres and Liveaboards
      </Label>

      <div className="inputboxType2">
        <FormGroup>
          <InputField
            placeholder="Full Business Name"
            value={formValues.BusinessName}
            onChange={(text) =>
              setFormValues({ ...formValues, BusinessName: text.target.value })
            }
          />
        </FormGroup>
      </div>

      <Label className="explainerMicro">(For display purposes)</Label>

      <div className="inputboxType2">
        <FormGroup>
          <InputField
            placeholder="Website URL"
            value={formValues.WebsiteLink}
            onChange={(text) =>
              setFormValues({ ...formValues, WebsiteLink: text.target.value })
            }
          />
        </FormGroup>
      </div>

      <Label className="explainerMicro">(To validate your business)</Label>

      <div className="inputboxType2">
        <FormGroup>
          <InputField
            placeholder="Latitude"
            value={formValues.Latitude}
            onChange={(text) =>
              setFormValues({ ...formValues, Latitude: text.target.value })
            }
          />
        </FormGroup>
      </div>

      <div className="inputboxType2">
        <FormGroup>
          <InputField
            placeholder="Longitude"
            value={formValues.Longitude}
            onChange={(text) =>
              setFormValues({ ...formValues, Longitude: text.target.value })
            }
          />
        </FormGroup>
      </div>
      <Label className="explainerMicro">(For map placement)</Label>

      <FormGroup>
        <Button
          variant="text"
          id="modalButtonDivPa"
          style={{ backgroundColor: "#538bdb", cursor: "pointer" }}
          onClick={() => handleSubmit(formValues)}
        >
          Submit Account Request
        </Button>
      </FormGroup>

      <animated.div
        className="successModal modalBase"
        style={sucessModalSlide}
        ref={successModalRef}
      >
        <ConfirmationModal
					submissionItem='partner account creation request'
					animateModal={animateSuccessModal}
					handleClose={handleClose}
					isSuccess={true}
				/>
      </animated.div>

      <animated.div
        className="cautionModal modalBase"
        style={cautionModalSlide}
        ref={cautionModalRef}
      >
        <ConfirmationModal
					submissionItem='partner account creation request'
					animateModal={animateCautionModal}
					isSuccess={false}
				/>
      </animated.div>
    </div>
  );
}
