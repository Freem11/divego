import React, { useState, useContext } from "react";
import { Form, Label } from "reactstrap";
import { SessionContext } from "./contexts/sessionContext";
import {
  sessionCheck,
  signInStandard,
  register,
} from "../supabaseCalls/authenticateSupabaseCalls";
import { createProfile } from "../supabaseCalls/accountSupabaseCalls";
import "./authenication.css";
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
import InputField from "./reusables/inputField";

let emailVar = false;
let passwordVar = false;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;
const appleAppId = import.meta.env.VITE_APPLE_APP_ID;
const REDIRECT_URI = window.location.href;

export default function SignInRoute(props) {
  const { setValue } = props
  const { setActiveSession } = useContext(SessionContext);
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
      handleOAuthSubmit(appleObject);
    } else {
      let reUsedApple = {
        email: decoded.email,
        id: decoded.sub,
      };
      handleOAuthSubmit(reUsedApple);
    }
  };

  async function getGoogleUserData(token) {
    if (!token) return;

    try {
      const res = await fetch(`https://www.googleapis.com/userinfo/v2/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
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

      if (registrationToken) {
        await createProfile({
          id: registrationToken.data.session.user.id,
          email: registrationToken.data.user.email,
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

  const  handlePageSwap = () => {
    setValue(1)
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
          <InputField
            placeholder="Email"
            className="inpts"
            name="email"
            value={formVals.email}
            onChange={handleChange}
            onFocus={() => setLoginFail(null)}
          />

          <InputField
            placeholder="Password"
            className="inpts"
            type="password"
            name="password"
            value={formVals.password}
            onChange={handleChange}
            onFocus={() => setLoginFail(null)}
          />
        </div>
        <Label className="registerClick" onClick={handlePageSwap}>Need An Account? Register Here</Label>
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
