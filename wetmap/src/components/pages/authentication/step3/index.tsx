import React, { useState, useContext } from "react";
import { Label } from "reactstrap";

// import Button from "../../../reusables/button";
import { SliderContext } from "../../../reusables/slider/context";
import Icon from "../../../../icons/Icon";
import { Box, Typography } from "@mui/material";
import carouselData from "../carousel-data.json";
import TextInput from "../../../reusables/textInput";
import { useForm } from "react-hook-form";
import { Form, FormRules } from "./form";
import Button from "../../../reusables/button";
import {
  sessionCheck,
  signInStandard,
} from "../../../../supabaseCalls/authenticateSupabaseCalls";
import { SessionContext } from "../../../contexts/sessionContext";

export default function TutorialStep3() {
  const [loginFail, setLoginFail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Form>();
  const { goToSlide } = useContext(SliderContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const { slideBackward } = useContext(SliderContext);
  const { setActiveSession } = useContext(SessionContext);

  const onSubmit = async (data: Form) => {
    // slideBackward();
    // console.log(data);
    if (data.email === "" || data.password === "") {
      setLoginFail("Please fill out both email and password");

      return;
    } else {
      let accessToken = await signInStandard(data);

      if (accessToken?.data?.session !== null) {
        localStorage.setItem(
          "token",
          JSON.stringify(accessToken?.data.session.refresh_token)
        );
        setActiveSession(accessToken.data.session);
      } else {
        setLoginFail("The credentials you supplied are not valid");
        return;
      }
      let _ = await sessionCheck();
    }
  };

  return (
    <>
      <Box sx={{ height: 62 }} />

      <div style={{ display: "flex" }}>
        <Icon
          name="chevron-left"
          fill="white"
          width="80px"
          onClick={() => slideBackward()}
        />
      </div>

      <Box sx={{ mt: "48px", mx: 9 }}>
        <Typography variant="h3" align="left">
          {carouselData[2].title}
        </Typography>

        <Box sx={{ height: 48 }} />

        <form
          className="flex-column-between mx-6 mb-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div style={{ backgroundColor: "white" }}>
            <TextInput
              error={errors.email}
              iconLeft={<Icon name="at" />}
              placeholder={carouselData[2].emailPlaceholder}
              onFocus={() => setLoginFail(null)}
              {...register("email", FormRules.email)}
            />
          </div>

          <Box sx={{ height: 16 }} />

          <div style={{ backgroundColor: "white" }}>
            <TextInput
              error={errors.password}
              type={secureTextEntry ? "password" : "text"}
              iconLeft={<Icon name="lock-outline" />}
              iconRight={
                secureTextEntry ? (
                  <Icon
                    name="eye-off"
                    onClick={() => setSecureTextEntry(false)}
                  />
                ) : (
                  <Icon name="eye" onClick={() => setSecureTextEntry(true)} />
                )
              }
              placeholder={carouselData[2].passwordPlaceholder}
              onFocus={() => setLoginFail(null)}
              {...register("password", FormRules.password)}
            />
          </div>

          {loginFail && <Label className="erroMsg">{loginFail}</Label>}

          {/* Log In button */}
          <Box
            sx={{
              mt: "116px",
              width: "30%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              disabled={isSubmitting}
              className="btn-lg bg-primary"
              type="submit"
              iconRight={<Icon name="chevron-right" />}
            >
              {carouselData[2].buttonText}
            </Button>
          </Box>
        </form>

        <Box sx={{ height: 48 }} />

        <p>
          {carouselData[2].promptText}
          <span
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "none",
            }}
            onClick={() => goToSlide(0)}
          >
            {carouselData[2].promptLinkText}
          </span>
        </p>
      </Box>
    </>
  );
}
