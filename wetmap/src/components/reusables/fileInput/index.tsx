import React, { DetailedHTMLProps, InputHTMLAttributes, useRef  } from 'react';

type TextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type CustomInputProps = {
  children:      React.ReactElement
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
};

const FileInput = React.forwardRef(function FileInput(props: TextInputProps & CustomInputProps, ref) {
  const { children, onChange, onFileChange, ...rest } = props;
  const fileUploaderRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        type="file"
        onChange={(event) => {
          onFileChange?.(event);
          onChange?.(event);
        }}
        ref={(e) => {
          fileUploaderRef.current = e;
          if (ref && typeof ref === 'function') {
            ref(e);
          }
        }}
        {...rest}
      />
      { React.cloneElement(children, { onClick: () => fileUploaderRef?.current?.click?.() }) }
    </>

  );
});

export default FileInput;
