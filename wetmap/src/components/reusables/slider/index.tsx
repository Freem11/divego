import React, { DetailedHTMLProps, InputHTMLAttributes, useRef } from "react";

type TextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type CustomInputProps = {
  children: React.ReactElement;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Slider = React.forwardRef(function Slider(
  props: TextInputProps & CustomInputProps,
  ref
) {
  const { children, onChange, onFileChange, ...rest } = props;

  return (
    <>
      <div>{children}</div>
    </>
  );
});

export default Slider;
