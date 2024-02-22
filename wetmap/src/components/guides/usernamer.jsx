import React, { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { IterratorContext } from "../contexts/iterratorContext";
import { SessionContext } from "../contexts/sessionContext";
import { PinContext } from "../contexts/staticPinContext";
import { DiveSpotContext } from "../contexts/diveSpotContext";
import { UserProfileContext } from "../contexts/userProfileContext";
import { updateProfile, grabProfileById } from "../../supabaseCalls/accountSupabaseCalls";
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
      // let sessionUserId = 'acdc4fb2-17e4-4b0b-b4a3-2a60fdfd97dd';
      // console.log(sessionUserId, formVal.userName);
      try {
        await updateProfile({
          id: sessionUserId,
          username: formVal.userName,
        });
        let success = await grabProfileById(sessionUserId)

        if (success.length > 0) {
          setItterator(itterator + 1);
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
    console.log(e.target.name)
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
    setUserFail(null);
  };

  return (
    <div className="container">
      <p className="titleText">What is your diver name?</p>
      <InputBase
        value={formVal.userName}
        name="userName"
        placeholder="User Name"
        placeholdertextcolor="darkgrey"
        color="#F0EEEB"
        onChange={(e) => handleChange(e)}
        inputProps={{
          style: {
            textAlign: "center",
            fontFamily: "Itim",
            fontSize: "2vw",
            textOverflow: "ellipsis",
            backgroundColor: "#538dbd",
            height: "4vh",
            color: "lightgrey",
            width: "15vw",
            borderRadius: "20px",
            boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
            marginBottom: "15px"
          }
        }}
      ></InputBase>

      {userFail && <p className="erroMsgU">{userFail}</p>}

      <FormGroup>
          <div onClick={handleSubmit} className="pinButton">
          <p className="buttontext">Ok</p>
          </div>
        </FormGroup>
    </div>
  );
}
