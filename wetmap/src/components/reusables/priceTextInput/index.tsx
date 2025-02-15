import React, { useState } from 'react';
import TextInput, { TextInputProps } from '../textInput';

export type PriceTextInputProps = TextInputProps & {
  // currency: string // Maybe we need that in the future
};

const PriceTextInput = React.forwardRef<HTMLInputElement, PriceTextInputProps>(function PriceTextInput({ error, value: initialValue, ...rest }: PriceTextInputProps, ref) {
  const [price, setPrice] = useState(initialValue);
  const [prevPrice, setPrevPrice] = useState('');

  const handlePriceChange = (data: any) => {
    const currPrice = data.target.value;

    const curr2 = currPrice.replace(/[^0-9.]/g, '');
    const prev2 = prevPrice.replace(/[^0-9.]/g, '');

    const regex1 = /^\d+(\.\d{1,2})?$/; // price without money symbol
    const regex4 = /^\d+(\.)?$/; // number with decimal at end

    let result = '';
    if (curr2 == '' || regex4.test(curr2)) {
      const num = curr2;
      setPrevPrice(num);
      result = (num.length == 0) ? '' : '$' + num; // dupe
      setPrice(result);
    } else {
      const validated = regex1.test(curr2);
      const num = (validated) ? curr2 : prev2;
      setPrevPrice(num);
      result = '$' + num; // dupe
      setPrice(result);
    }

    setPrice(result);
    if (rest.onChange) rest.onChange(data);
  };

  const handleBlur = (data: any) => {
    const currPrice = data.target.value.replace(/[^0-9.]/g, '');
    const roundedPrice = Math.round(parseFloat(currPrice) * 100) / 100;
    const formattedPrice = isNaN(roundedPrice) ? '' : `$${roundedPrice.toFixed(2)}`;
    setPrevPrice(currPrice);
    setPrice(formattedPrice);
  };

  return (
    <TextInput
      value={price}
      ref={ref}
      error={error}
      {...rest}
      onChange={handlePriceChange}
      onBlur={handleBlur}
    />
  );
});

export default PriceTextInput;
