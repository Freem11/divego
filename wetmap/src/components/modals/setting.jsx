import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import { useContext, useState } from "react";
import Collapse from "@mui/material/Collapse";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { signOut } from "../../supabaseCalls/authenticateSupabaseCalls";
import { SessionContext } from "../contexts/sessionContext";
import "./settings.css";
import ActDelDialog from "./dialog";
import CloseIcon from "@mui/icons-material/Close";

const Settings = (props) => {
  const { animateSettingsModal } = props;
  const { activeSession, setActiveSession } = useContext(SessionContext);
  const [showDangerZone, setShowDangerZone] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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
            marginTop: "5px",
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
    <Container fluid>
      <Form>
        <div className="titleDiv2" >
          <Label style={{ marginTop: 3, marginRight: 225, width: "200%" }}> 
            <strong>Settings</strong>
          </Label>
          <FormGroup>
            <Button
              variant="text"
              id="closeButton2"
              onClick={() => animateSettingsModal()}
              style={{ display: "flex", flexDirection: "column", marginRight: 10, marginTop: 10, backgroundColor: "transparent", border: "none"}}
            >
              <CloseIcon
                sx={{ color: "lightgrey", height: "36px", width: "36px" }}
              ></CloseIcon>
            </Button>
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
              marginTop: "5px",
            }}
          >
            Sign Out
          </Label>
        </div>

        <div
          className="dangerZonebar"
          onDoubleClick={() => setShowDangerZone(!showDangerZone)}
        >
          <ErrorOutlineIcon
            sx={{
              color: "maroon",
              height: "28px",
              width: "28px",
              marginRight: "10%",
            }}
          ></ErrorOutlineIcon>
          <strong className="dangerText">Danger Zone</strong>
          <ErrorOutlineIcon
            sx={{
              color: "maroon",
              height: "28px",
              width: "28px",
              marginLeft: "10%",
            }}
          ></ErrorOutlineIcon>
        </div>

        <Collapse in={showDangerZone} orientation="vertical" collapsedSize="0px" className="dngZn">
          {dangerZone}
        </Collapse>
        </div>
      </Form>

      <ActDelDialog
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      />
    </Container>
  );
};

export default Settings;
