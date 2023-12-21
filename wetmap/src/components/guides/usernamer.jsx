import React, { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { IterratorContext } from "../contexts/iterratorContext";
import { SessionContext } from "../contexts/sessionContext";
import { PinContext } from "../contexts/staticPinContext";
import { DiveSpotContext } from "../contexts/diveSpotContext";
import { UserProfileContext } from "../contexts/userProfileContext";
import { updateProfile } from "../../supabaseCalls/accountSupabaseCalls";
import InputBase from "@mui/material/InputBase";
import "./usernamer.css";

let userVar = false;

export default function UserNamer() {
  const { activeSession } = useContext(SessionContext);
  const { profile, setProfile } = useContext(UserProfileContext);

  const { pinValues, setPinValues } = useContext(PinContext);
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);

  const { itterator, setItterator } = useContext(IterratorContext);
  const [userFail, setUserFail] = useState(null);
  const [subButState, setSubButState] = useState(false);

  const [formVal, setFormVal] = useState({
    userName: "",
  });

  const [formValidation, SetFormValidation] = useState({
    userName: "",
  });

  const handleSubmit = async () => {
    if (formVal.userName === "" || formVal.userName === null) {
      userVar = true;
    } else {
      userVar = false;
    }

    SetFormValidation({
      ...formValidation,
      userName: userVar,
    });

    if (formVal.userName === "") {
      setUserFail("Your Username cannot be blank!");
    } else {
      let sessionUserId = activeSession.user.id;
      // let sessionUserId = 'a93f6831-15b3-4005-b5d2-0e5aefcbda13';
      console.log(sessionUserId, formVal.userName);
      try {
        const success = await updateProfile({
          id: sessionUserId,
          username: formVal.userName,
        });
        if (success.length > 0) {
          // setItterator(itterator + 1);
          setFormVal({ userName: "" });
          setProfile([{ ...profile, UserName: formVal.userName }]);
          setPinValues({
            ...pinValues,
            UserId: success[0].UserID,
            UserName: success[0].UserName,
          });
          setAddSiteVals({
            ...addSiteVals,
            UserID: success[0].UserID,
            UserName: success[0].UserName,
          });
        } else {
          setUserFail("Sorry that username has already been taken");
        }
      } catch (e) {
        setUserFail("Sorry that username has already been taken");
        console.log({ title: "Error", message: e.message });
      }
    }
  };

  const handleChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
    setLoginFail(null);
  };

  return (
    <div className="container">
      <p className="titleText">What is your diver name?</p>
      <InputBase
        // value={formVal.userName}
        placeholder="User Name"
        placeholderTextColor="darkgrey"
        color="#F0EEEB"
        on={() => setUserFail(null)}
        onChange={handleChange}
        inputProps={{
          style: {
            textAlign: "center",
            fontFamily: "Indie Flower",
            fontSize: "20px",
            textOverflow: "ellipsis",
            backgroundColor: "#538dbd",
            height: "35px",
            color: "lightgrey",
            width: "220px",
            borderRadius: "20px",
            boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
            marginBottom: "-15px"
          }
        }}
      ></InputBase>

      {userFail && <p className="erroMsg">{userFail}</p>}

      <FormGroup>
          <div onClick={handleSubmit} className="pinButton">
          <p className="buttontext">Ok</p>
          </div>
        </FormGroup>
    </div>
  );
}
