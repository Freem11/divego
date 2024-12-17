import React, { useState, useContext } from "react";
// import Button from "../../../reusables/button";
import { SliderContext } from "../../../reusables/slider/context";
import Icon from "../../../../icons/Icon";
import { Box, Typography } from "@mui/material";
import carouselData from "../carousel-data.json";
import TextInput from "../../../reusables/textInput";
import { useForm } from "react-hook-form";
import { Form, FormRules } from "./form";
import Button from "../../../reusables/button";

export default function TutorialStep3() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Form>();
  const { goToSlide } = useContext(SliderContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const { slideBackward } = useContext(SliderContext);
  const onSubmit = (data: Form) => {
    // slideForward();
    console.log(data);
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
              {...register("email", FormRules.email)}
            />
          </div>

          <Box sx={{ height: 16 }} />

          <div style={{ backgroundColor: "white" }}>
            <TextInput
              error={errors.password}
              iconLeft={<Icon name="lock-outline" />}
              iconRight={
                secureTextEntry ? (
                  <Icon name="eye" onClick={() => setSecureTextEntry(false)} />
                ) : (
                  <Icon
                    name="eye-off"
                    onClick={() => setSecureTextEntry(true)}
                  />
                )
              }
              placeholder={carouselData[2].passwordPlaceholder}
              {...register("password", FormRules.password)}
            />
          </div>

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
        </form>
      </Box>
    </>
  );
}
