import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import { useState, useContext } from "react";
import { signOut } from "../../supabaseCalls/authenticateSupabaseCalls";
import { SessionContext } from "..//contexts/sessionContext";
import "./settings.css";

const Settings = (props) => {

  const { activeSession, setActiveSession } = useContext(SessionContext);

  const handleLogout = async() => {
    await localStorage.removeItem("token");
    await signOut()
    setActiveSession(null)
  }

  return (
    <Container fluid>
    <Form>
      <div className="titleDiv2">
          <Label>
            <strong>Settings</strong>
          </Label>
        </div>
      
      <div
            onClick={handleLogout}
            className="Logoutbutton"
          >
            <Label style={{ fontFamily: "Caveat", color: "#9B884E", cursor: "pointer", marginTop: "5px" }}>
            Sign Out
            </Label>
          </div>

    </Form>
    </Container>
  );
};

export default Settings;
