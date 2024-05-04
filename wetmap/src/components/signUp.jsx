import { Form, Label } from "reactstrap";
import React, { useState, useContext } from "react";
import { SessionContext } from "./contexts/sessionContext";
import {
  register,
  sessionCheck,
} from "../supabaseCalls/authenticateSupabaseCalls";
import "./authenication.css";
import InputBase from "@mui/material/InputBase";
import { createProfile } from "../supabaseCalls/accountSupabaseCalls";

let emailVar = false;
let passwordVar = false;
let firstVar = false;
let lastVar = false;
import manta from "../images/Matt_Manta_White.png"

export default function SignUpRoute() {
  const { setActiveSession } = useContext(SessionContext);

  const [formVals, setFormVals] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [regFail, setRegFail] = useState(null);

  const [formValidation, SetFormValidation] = useState({
    emailVal: false,
    passwordVal: false,
  });

  const handleSignUpSubmit = async () => {
    if (formVals.email === "" || formVals.email === null) {
      emailVar = true;
    } else {
      emailVar = false;
    }

    if (formVals.password === "" || formVals.password === null) {
      passwordVar = true;
    } else {
      passwordVar = false;
    }

    if (formVals.firstName === "" || formVals.firstName === null) {
      firstVar = true;
    } else {
      firstVar = false;
    }

    if (formVals.lastName === "" || formVals.lastName === null) {
      lastVar = true;
    } else {
      lastVar = false;
    }

    SetFormValidation({
      ...formValidation,
      emailVal: emailVar,
      passwordVal: passwordVar,
      firstNameVal: firstVar,
      lastNameVal: lastVar,
    });

    if (
      formVals.email === "" ||
      formVals.password == "" ||
      formVals.firstName == "" ||
      formVals.lastName == ""
    ) {
      setRegFail("Please fill out all fields");
      return;
    } else {
      let registrationToken = await register(formVals);
      if (registrationToken.data.session !== null) {
        await createProfile({id: registrationToken.data.session.user.id , email: formVals.email})
        await localStorage.setItem(
          "token",
          JSON.stringify(registrationToken.data.session.refresh_token)
        );
        setActiveSession(registrationToken.data);
      } else {
        setRegFail(`You have already registered this account, please sign in`);
      }
      let checker = await sessionCheck();
    }
  };

  const handleChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
    setRegFail(null);
  };
  return (
    <div className="containerDiv">
      <Form onSubmit={handleSignUpSubmit} className="formstyle">
        <div className="headlinerdiv">
          <img
            style={{
              height: "20vh",
              marginTop: "5vh",
              marginBottom: "0%",
              backgroundColor: "#538dbd",
            }}
            src={manta}
          />
          <h1 className="logoTag">Scuba SEAsons</h1>
        </div>
        <div className="inptBx">
          <InputBase
            placeholder="Email"
            variant="standard"
            className="inpts"
            type="text"
            name="email"
            value={formVals.email}
            onChange={handleChange}
            onFocus={() => setRegFail(null)}
            inputProps={{
              style: {
                textAlign: "center",
                fontFamily: "Itim",
                textOverflow: "ellipsis",
                backgroundColor: "#538dbd",
                width: "25vw",
                height: "4vh",
                color: "#F0EEEB",
                borderRadius: "10px",
                boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
              },
            }}
          />

          <InputBase
            placeholder="Password"
            className="inpts"
            type="password"
            name="password"
            value={formVals.password}
            onChange={handleChange}
            onFocus={() => setRegFail(null)}
            inputProps={{
              style: {
                textAlign: "center",
                fontFamily: "Itim",
                textOverflow: "ellipsis",
                backgroundColor: "#538dbd",
                width: "25vw",
                height: "4vh",
                color: "#F0EEEB",
                borderRadius: "10px",
                boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
              },
            }}
          />

          <InputBase
            placeholder="First Name"
            className="inpts"
            type="text"
            name="firstName"
            value={formVals.firstName}
            onChange={handleChange}
            onFocus={() => setRegFail(null)}
            inputProps={{
              style: {
                textAlign: "center",
                fontFamily: "Itim",
                textOverflow: "ellipsis",
                backgroundColor: "#538dbd",
                width: "25vw",
                height: "4vh",
                color: "#F0EEEB",
                borderRadius: "10px",
                boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
              },
            }}
          />

          <InputBase
            placeholder="Last Name"
            className="inpts"
            type="text"
            name="lastName"
            value={formVals.lastName}
            onChange={handleChange}
            onFocus={() => setRegFail(null)}
            inputProps={{
              style: {
                textAlign: "center",
                fontFamily: "Itim",
                textOverflow: "ellipsis",
                backgroundColor: "#538dbd",
                width: "25vw",
                height: "4vh",
                color: "#F0EEEB",
                borderRadius: "10px",
                boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
              },
            }}
          />
          {regFail && <Label className="erroMsg">{regFail}</Label>}
        </div>
      </Form>
      <div className="authwrapper">
        <div className="signButton" onClick={handleSignUpSubmit}>
          Sign Up
        </div>
      </div>
    </div>
  );
}
