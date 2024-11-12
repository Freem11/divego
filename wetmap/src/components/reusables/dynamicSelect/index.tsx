import React, { useState, ReactNode, useRef, Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import Select, { SelectProps } from '../select';


const defaultProps = {
  searchLimit: 10,
};

type DynamicSelectProps = SelectProps & Partial<typeof defaultProps> & {
  getMoreOptions:      (search: string, limit: number, skip: number) => Promise<any>
  getSelectedOptions?: (values: any) => Promise<any>
};


const DynamicSelect = React.forwardRef<HTMLInputElement, DynamicSelectProps>(function DynamicSelect(_props: DynamicSelectProps, ref) {
  console.log('Render DynamicSelect');

  const props = { ...defaultProps, ..._props };
  const { getSelectedOptions, getMoreOptions, searchLimit, ...rest } = props;
  const [options, setOptions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchOffset, setSearchOffset] = useState(0);
  const [selectedTotalCount, setSelectedTotalCount] = useState(null);

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
    console.log(`load options for "${search}"...`);
    if (!getMoreOptions) {
      return;
    }
    setIsFetching(true);
    const [data] = await Promise.all([
      props.getMoreOptions(search, searchLimit, searchOffset),
      new Promise(resolve => setTimeout(resolve, 300)), // atrificial deplay to avoid flickering
    ]);

    console.log(`data loaded options for "${search}" : `, data);
    setIsFetching(false);
    if (!data?.options) {
      setOptions([]);
      return;
    }

    setOptions((options) => {
      if (replaceExistingOptions) {
        return data.options;
      }

      // prevent duplicating values
      const existingValues = options.reduce((acc, curr) => (acc[curr.value] = true, acc), {});
      for (const newOption of data.options) {
        if (!existingValues[newOption.value]) {
          options.push(newOption);
        }
      }
      return [...options];
    });
    // setSearchTotalCount(data.totalCount);
    // setIsFetching(false);

    // if (!getSelectedOptions && value) {
    //   setInternalValue(Array.isArray(value) ? value : [value]);
    //   setSelectedTotalCount(Array.isArray(value) ? value.length : 1);
    // }
  };

  return (
    <Select
      options={options}
      onSearch={onSearch}
      {...rest}
    />
  );
});

export default DynamicSelect;
