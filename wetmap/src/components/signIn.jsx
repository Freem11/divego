// import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { SessionContext } from "./contexts/sessionContext";
import {
  sessionCheck,
  signInStandard,
  register,
  signInFaceBook,
  signInGoogle,
} from "../supabaseCalls/authenticateSupabaseCalls";
import { createProfile } from "../supabaseCalls/accountSupabaseCalls";
import { Auth } from "@supabase/auth-ui-react";
import "./authenication.css";
import InputBase from "@mui/material/InputBase";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  LoginSocialApple,
} from "reactjs-social-login";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";
import manta from "../images/Matt_Manta_White.png"
import headliner from "../images/Headliner.png";

let emailVar = false;
let passwordVar = false;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;
const appleAppId = import.meta.env.VITE_APPLE_APP_ID;
const REDIRECT_URI = window.location.href;

export default function SignInRoute() {
  const { activeSession, setActiveSession } = useContext(SessionContext);
  const [profile, setProfile] = useState(null);
  const [formVals, setFormVals] = useState({
    email: "",
    password: "",
  });

  const [loginFail, setLoginFail] = useState(null);

  const [formValidation, SetFormValidation] = useState({
    emailVal: false,
    passwordVal: false,
  });

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window.atob(base64).split("").map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join("")
    );

    return JSON.parse(jsonPayload);
  }

  const handleAppleUserData = async (userData) => {
    const decoded = parseJwt(userData.authorization.id_token);
    
    if (userData.user) {
      let appleObject = {
        name: `${userData.user.name.firstName} ${userData.user.name.lastName}`,
        email: userData.user.email,
        id: decoded.sub,
      };
      // await localStorage.setItem("appletoken", JSON.stringify(appleObject));
      handleOAuthSubmit(appleObject);
    } else {
      let reUsedApple = {
        email: decoded.email,
        id: decoded.sub,
      };
      handleOAuthSubmit(reUsedApple);
      // let reUsedApple = JSON.parse(await localStorage.getItem("appletoken"));
      // if (reUsedApple && reUsedApple.email === decoded.email) {
      //   handleOAuthSubmit(reUsedApple);
      // } else {
      //   setLoginFail(
      //     "Invalid Credentials (email and name required for sign in)"
      //   );
      // }
    }
  };

  async function getGoogleUserData(token) {
    if (!token) return;

    try {
      const res = await fetch(`https://www.googleapis.com/userinfo/v2/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      // console.log("helloG?", user);
      handleOAuthSubmit(user);
    } catch (err) {
      console.log("error", err);
    }
  }

  async function getFacebookUserData(token2) {
    if (!token2) return;

    try {
      const res2 = await fetch(
        `https://graph.facebook.com/me?access_token=${token2}&fields=id,name,email`
      );
      const user2 = await res2.json();
      handleOAuthSubmit(user2);
      // console.log("helloF?", user2);
    } catch (err) {
      console.log("error", err);
    }
  }

  const handleOAuthSubmit = async (user) => {

    let Fname;
    let LName;
    let Pword = user.id;
    let MailE = user.email;

    if (user.given_name) {
      if (user.family_name) {
        Fname = user.given_name;
        LName = user.family_name;
      } else {
        Fname = user.given_name.split(" ").slice(0, -1).join(" ");
        LName = user.given_name.split(" ").slice(-1)[0];
      }
    } else if (user.name) {
      Fname = user.name.split(" ").slice(0, 1);
      LName = user.name.split(" ").slice(-1);
    }

    let accessToken = await OAuthSignIn({
      password: Pword,
      email: MailE,
      firstName: Fname,
      lastName: LName,
    });
  };

  async function OAuthSignIn(formVals) {
    let accessToken = await signInStandard(formVals);
    if (accessToken.data.session !== null) {
      await localStorage.setItem(
        "token",
        JSON.stringify(accessToken.data.session.refresh_token)
      );
      setActiveSession(accessToken.data.session);
      return;
    } else {
      let registrationToken = await register(formVals);
      if (formVals.firstName){
        await createProfile({
          id: registrationToken.data.session.user.id,
          email: formVals.email,
        });
      }
     
      if (registrationToken.data.session !== null) {
        await localStorage.setItem(
          "token",
          JSON.stringify(registrationToken.data.session.refresh_token)
        );
        setActiveSession(registrationToken.data.session);
      } else {
        setLoginFail("You already have an account with this email");
      }
    }
  }

  const handleSignInSubmit = async () => {
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

    SetFormValidation({
      ...formValidation,
      emailVal: emailVar,
      passwordVal: passwordVar,
    });

    if (formVals.email === "" || formVals.password == "") {
      setLoginFail("Please fill out both email and password");
      return;
    } else {
      let accessToken = await signInStandard(formVals);
      if (accessToken.data.session !== null) {
        localStorage.setItem(
          "token",
          JSON.stringify(accessToken.data.session.refresh_token)
        );
        setActiveSession(accessToken.data.session);
      } else {
        setLoginFail("The credentials you supplied are not valid");
        return;
      }
      let _ = await sessionCheck();
    }
  };

  const handleChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
    setLoginFail(null);
  };

  return (
    <div className="containerDiv">
      <Form onSubmit={handleSignInSubmit} className="formstyle">
        <div className="headlinerdiv">
          <img
            style={{
              height: "20vh",
              marginTop: "-2vh",
              marginBottom: "0%",
              backgroundColor: "#538dbd",
            }}
            src={manta}
          /><br/>
          <h1 className="logoTag">Scuba SEAsons</h1>
        </div>

        <div className="Oaths">
          <div className="OAuthButton">
            <LoginSocialGoogle
              isOnlyGetToken
              scope="https://www.googleapis.com/auth/userinfo.email"
              client_id={googleClientId || ""}
              onResolve={({ provider, data }) => {
                setProfile(data);
                getGoogleUserData(data.access_token);
                console.log("google", data);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <GoogleLoginButton style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "26vw", height: "5vh", fontSize: "1.7vw" }} />
            </LoginSocialGoogle>
          </div>

          <div className="OAuthButton">
            <LoginSocialFacebook
              isOnlyGetToken
              appId={facebookAppId || ""}
              state={false}
              onResolve={({ provider, data }) => {
                setProfile(data);
                getFacebookUserData(data.accessToken);
                console.log("facebook", data);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <FacebookLoginButton style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "26vw", height: "5vh", fontSize: "1.7vw" }} />
            </LoginSocialFacebook>
          </div>

          <div className="OAuthButton">
            <LoginSocialApple
              client_id={appleAppId || "1"}
              scope={"name email"}
              redirect_uri={REDIRECT_URI}
              onResolve={({ provider, data }) => {
                handleAppleUserData(data);
                console.log("apple", data);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <AppleLoginButton style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "26vw", height: "5vh", fontSize: "1.7vw" }} />
            </LoginSocialApple>
          </div>
        </div>

        <div className="inptBx">
          <InputBase
            // id="standard-basic"
            // label="Latitude"
            placeholder="Email"
            // variant="standard"
            className="inpts"
            type="text"
            name="email"
            value={formVals.email}
            onChange={handleChange}
            onFocus={() => setLoginFail(null)}
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
            // id="standard-basic"
            // label="Latitude"
            placeholder="Password"
            // variant="standard"
            className="inpts"
            type="password"
            name="password"
            value={formVals.password}
            onChange={handleChange}
            onFocus={() => setLoginFail(null)}
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
        </div>

        {loginFail && <Label className="erroMsg">{loginFail}</Label>}
      </Form>
      <div className="authwrapper">
        <div className="signButton" onClick={handleSignInSubmit}>
          Sign In
        </div>
      </div>
    </div>
  );
}
