import React, { DetailedHTMLProps, InputHTMLAttributes, useState  } from 'react';
import './style.scss';

export type PriceTextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  iconLeft?:  React.ReactNode
  iconRight?: React.ReactNode
  error?:     any
};

const PriceTextInput = React.forwardRef<HTMLInputElement, PriceTextInputProps>(function PriceTextInput(props: PriceTextInputProps, ref) {
  const { iconLeft, iconRight, className, error, ...rest } = props;

  const [thePrice, setThePrice] = useState('');
  const [prevPrice, setPrevPrice] = useState('');

  const priceChange = (data: any) => {
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
      setThePrice(result);
    } else {
      const validated = regex1.test(curr2);
      const num = (validated) ? curr2 : prev2;
      setPrevPrice(num);
      const result = '$' + num; // dupe
      setThePrice(result);
    }

    data.target.value = thePrice;
  };

  return (
    <div className={`${className ?? ''} ssrc-text-input ${error ? 'ssrc-text-input--error' : ''}`}>
      {iconLeft && <i className="ssrc-text-input__icon-left">{iconLeft}</i>}
      <input  value={thePrice} ref={ref} {...rest} onChange={priceChange} />
      {iconRight && <i className="ssrc-text-input__icon-right">{iconRight}</i>}
    </div>
  );
});

export default PriceTextInput;
