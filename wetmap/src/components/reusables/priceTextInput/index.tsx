import React, { DetailedHTMLProps, InputHTMLAttributes, useState  } from 'react';
import TextInput from '../textInput';
import Icon from '../../../icons/Icon';

export type PriceTextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  error?:     any
};

const PriceTextInput = React.forwardRef<HTMLInputElement, PriceTextInputProps>(function PriceTextInput({ error, ...rest }: PriceTextInputProps, ref) {
  const [price, setPrice] = useState('');
  const [prevPrice, setPrevPrice] = useState('');

  const handlePriceChange = (data: any) => {
    const currPrice = data.target.value;

    const curr2 = currPrice.replace(/[^0-9.]/g, '');
    const prev2 = prevPrice.replace(/[^0-9.]/g, '');

    const regex1 = /^\d+(\.\d{1,2})?$/; // price without money symbol
    const regex4 = /^\d+(\.)?$/; // number with decimal at end

    // const validated = curr2.match(regex3);
    if (curr2 == '' || regex4.test(curr2)) {
      const num = curr2;
      setPrevPrice(num);
      const result = (num.length == 0) ? '' : '$' + num; // dupe
      setPrice(result);
    } else {
      const validated = regex1.test(curr2);
      const num = (validated) ? curr2 : prev2;
      setPrevPrice(num);
      const result = '$' + num; // dupe
      setPrice(result);
    }

    data.target.value = price;
  };

  return (
    <TextInput
      value={price}
      ref={ref}
      error={error}
      {...rest}
      onChange={handlePriceChange}
      iconLeft={(
        <Icon name="currency-usd" />
      )}
    />
  );
});

export default PriceTextInput;
