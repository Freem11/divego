import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import { useContext, useState, useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { signOut } from "../../supabaseCalls/authenticateSupabaseCalls";
import { SessionContext } from "../contexts/sessionContext";
import { PartnerModalContext } from "../contexts/partnerAccountRequestModalContext";
import { SettingsModalContext } from "../contexts/settingsModalContext";
import { UserProfileContext } from "../contexts/userProfileContext";
import "./settings.css";
import ActDelDialog from "./dialog";
import CloseIcon from "@mui/icons-material/Close";
import CloseButton from "../closeButton/closeButton";
import { grabRequestById } from "../../supabaseCalls/partnerSupabaseCalls";

const Settings = (props) => {
  const { animateSettingsModal } = props;
  const { activeSession, setActiveSession } = useContext(SessionContext);
  const { profile, setProfile } = useContext(UserProfileContext);
  const { settingsModal, setSettingsModal } = useContext(SettingsModalContext);
  const { partnerModal, setPartnerModal } = useContext(
    PartnerModalContext
  );
  const [showDangerZone, setShowDangerZone] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [requestCheck, setRequestCheck] = useState([]);

  const checkForRequest = async (id) => {
    let returnedCheck = await grabRequestById(id);
    setRequestCheck(returnedCheck);
  };

  const handlePartnerButton = () => {
    setPartnerModal(true);
    setSettingsModal(false);
  };
  useEffect(() => {
    checkForRequest(activeSession.user.id);
  }, []);

  const dangerZone = (
    <div
      style={{
        height: "50px",
        width: "90%",
        color: "pink",
        borderRadius: "15px",
      }}
    >
      <div onClick={() => setOpenDialog(true)} className="AccountDeleteButton">
        <Label
          style={{
            fontFamily: "Itim",
            color: "maroon",
            cursor: "pointer",
            fontSize: "1vw",
          }}
        >
          Delete Account
        </Label>
      </div>
    </div>
  );

  const handleLogout = async () => {
    await localStorage.removeItem("token");
    await signOut();
    setActiveSession(null);
  };

  return (
    <div className="masterDivSet">
      <div className="titleDiv2">
        <h3
          style={{
            width: "100vw",
            marginLeft: "1vw",
            textAlign: "left",
            fontFamily: "Patrick Hand",
            fontSize: "2vw",
            // backgroundColor: "pink",
          }}
        >
          Settings
        </h3>
        <FormGroup>
          <CloseButton
            id="closeButton"
            onClick={animateSettingsModal}
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

      <div className="lowerBoxSettings">
        <div onClick={handleLogout} className="Logoutbutton">
          <Label
            style={{
              fontFamily: "Itim",
              fontWeight: "bold",
              color: "gold",
              cursor: "pointer",
              fontSize: "1.5vw",
            }}
          >
            Sign Out
          </Label>
        </div>

        <div className="partnerButton">
          <div
            onClick={requestCheck.length > 0 ? null : handlePartnerButton}
            className="Logoutbutton"
          >
            <Label
              style={{
                paddingBottom: 3,
                fontFamily: "Itim",
                color: requestCheck.length > 0 ? "lightgrey" : "gold",
                fontSize: "1.5vw",
              }}
            >
              {requestCheck.length > 0
                ? "Request In Progress"
                : "Request Partner Account"}
            </Label>
          </div>
        </div>

        <div
          className="dangerZonebar"
          onDoubleClick={() => setShowDangerZone(!showDangerZone)}
        >
          <ErrorOutlineIcon
            sx={{
              color: "maroon",
              height: "2vw",
              marginRight: "10%",
            }}
          ></ErrorOutlineIcon>
          <strong className="dangerText">Danger Zone</strong>
          <ErrorOutlineIcon
            sx={{
              color: "maroon",
              height: "2vw",
              marginLeft: "10%",
            }}
          ></ErrorOutlineIcon>
        </div>

        <Collapse
          in={showDangerZone}
          orientation="vertical"
          collapsedSize="0px"
          className="dngZn"
        >
          {dangerZone}
        </Collapse>
      </div>

      <ActDelDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default Settings;
