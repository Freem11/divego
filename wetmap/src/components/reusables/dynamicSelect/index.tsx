import React, { useState, useEffect } from 'react';
import Select, { SelectProps } from '../select';


const defaultProps = {
  searchLimit: 100,
};

export type GetMoreOptions = (search: string, limit: number, skip: number) => Promise<{ options: any[] }>;

type DynamicSelectProps = SelectProps & Partial<typeof defaultProps> & {
  getMoreOptions:      GetMoreOptions
  getSelectedOptions?: (values: any) => Promise<any>
};


const DynamicSelect = React.forwardRef<HTMLInputElement, DynamicSelectProps>(function DynamicSelect(_props: DynamicSelectProps, forwardedRef) {
  const props = { ...defaultProps, ..._props };
  const { getSelectedOptions, getMoreOptions, searchLimit, ...rest } = props;
  const [options, setOptions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchOffset, setSearchOffset] = useState(0);

  useEffect(() => {
    init();
  }, []);


  const init = async () => {
    try {
      if (getSelectedOptions) {
        const data = await getSelectedOptions(props.value);
        setIsFetching(false);
        if (!data) {
          return;
        }

        if (data?.options?.length) {
          // there are pre-selected options
          setOptions(data.options);
        }
      }

      if (!props.disabled) {
        // add other possible options
        loadOptions('');
      }
    } catch (e) {
      setIsFetching(false);
      console.log(e);
    }
  };


  const onSearch = (search: string) => {
    loadOptions(search, true);
  };

  const loadOptions = async (search: string, replaceExistingOptions = false) => {
    if (!getMoreOptions) {
      return;
    }
    setIsFetching(true);
    const [data] = await Promise.all([
      props.getMoreOptions(search, searchLimit, searchOffset),
      new Promise(resolve => setTimeout(resolve, 300)), // atrificial deplay to avoid flickering
    ]);

    setIsFetching(false);
    if (!data?.options) {
      setOptions([]);
      return;
    }

    setOptions((options) => {
      if (replaceExistingOptions) {
        return data.options;
      }

      return [...options];
    });
  };

  return (
    <Select
      ref={forwardedRef}
      isFetching={isFetching}
      options={options}
      onSearch={onSearch}
      {...rest}
    />
  );
});

export default DynamicSelect;
