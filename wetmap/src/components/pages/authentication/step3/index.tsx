import React, { useContext } from "react";
// import Button from "../../../reusables/button";
import { SliderContext } from "../../../reusables/slider/context";
import Icon from "../../../../icons/Icon";
import { Box, Typography } from "@mui/material";
import carouselData from "../carousel-data.json";
import TextInput from "../../../reusables/textInput";
import { useForm } from "react-hook-form";
import { Form, FormRules } from './form';
import Button from "../../../reusables/button";

export default function TutorialStep3() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();
  const { goToSlide } = useContext(SliderContext);

  
  const { slideBackward } = useContext(SliderContext);
  const onSubmit = (data: Form) => {
      // slideForward();
      console.log(data);
    };
  return (
    <>
      {/* <Box sx={{ position: 'relative', height: 62, left: "3rem" }} /> */}
      <Box sx={{ height: 62 }} />

      <div style={{ display: "flex" }}>
        <Icon
          name="chevron-left"
          fill="white"
          width="80px"
          onClick={() => slideBackward()}
        />
      </div>

      <Box sx={{ height: 48 }} />

      <Typography variant="h3" align="left" sx={{ ml: 9 }}>
        {carouselData[2].title}
      </Typography>

      <Box sx={{ height: 48 }} />

      <form
        className="flex-column-between mx-6 mb-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          error={errors.email}
          iconLeft={<Icon name="person" />}
          placeholder={carouselData[2].emailPlaceholder}
          {...register("email", FormRules.username)}
        />
        <Box sx={{ height: 16 }} />
        
        <TextInput
          error={errors.password}
          iconLeft={<Icon name="person" />}
          placeholder={carouselData[2].passwordPlaceholder}
          {...register("password", FormRules.username)}
        />

        <div className="mb-4"></div>

        <Box sx={{ height: 48 }} />

        <Button
          disabled={isSubmitting}
          className="btn-lg bg-primary w-25"
          type="submit"
          iconRight={<Icon name="chevron-right" />}
        >
          {carouselData[2].buttonText}
        </Button>


        <Box sx={{ height: 48 }} />

        <p>{carouselData[2].promptText}
          <span
            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'none' }}
            onClick={() => goToSlide(0)}
          >
            {carouselData[2].promptLinkText}
          </span>
        </p>

      </form>

     
        
    </>
  );
}
