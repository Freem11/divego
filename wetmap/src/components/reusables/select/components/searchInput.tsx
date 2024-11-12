import React from 'react';

type SearchInputProps = {
  onChange:    () => void
  placeholder: string
  value:       string
};

const SearchInput = React.forwardRef(function TextInput(props: SearchInputProps, ref) {
  return (
    <input
      onChange={props.onChange}
      ref={ref}
      type="search"
      value={props.value}
    />
  );
});

export default SearchInput;
