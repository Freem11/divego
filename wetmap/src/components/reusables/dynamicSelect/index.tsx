
import React, { useEffect, useMemo, useRef, useState } from 'react';
// import Icon from '../../../icons/Icon';
import Select from 'rc-select';
import type { SelectProps } from 'rc-select';

import 'rc-select/assets/index.css';
import './style.scss';

export interface DynamicSelectProps {
  getMoreOptions?:     (search: string, limit: number, skip: number) => Promise<any>
  getSelectedOptions?: (values: any) => Promise<any>
  timeout:             number
  value?:              any
  reset?:              boolean
  searchLimit?:        number
  disabled?:           boolean
  placeholder?:        string
}


const DynamicSelect = (props: SelectProps & DynamicSelectProps) => {
  const [fetching, setFetching] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTotalCount, setSelectedTotalCount] = useState(null);
  const [searchTotalCount, setSearchTotalCount] = useState(null);
  const [searchOffset, setSearchOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState(null);
  const [internalValue, setInternalValue] = useState([]);
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [extraAmount, setExtraAmount] = useState(null);
  const [loadMore, setLoadMore] = useState(null);
  const [notFoundContent, setNotFoundContent] = useState(null);
  const timeoutRef = useRef(null);
  const { getMoreOptions, getSelectedOptions, timeout, value, reset, searchLimit, disabled, ...restProps } = props;

  useEffect(() => {
    setExtraAmount(calculateExtraAmount());
  }, [internalValue, selectedTotalCount]);

  useEffect(() => {
    if (options.length) {
      setLoadMore(calculateLoadMore());
    }
    if (!defaultOptions.length) {
      setDefaultOptions(options);
    }
  }, [searchTotalCount, searchOffset, options]);

  useEffect(() => {
    if (searchTerm !== null) {
      loadOptions(searchTerm);
    }
  }, [searchOffset]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // this is the way to clear selected options from outside
    if (reset?.length) {
      setInternalValue([]);
    }
  }, [reset]);

  const fetchData = async () => {
    try {
      if (getSelectedOptions) {
        const data = await getSelectedOptions(value);
        setFetchingData(false);
        if (!data) {
          return;
        }

        if (data?.options?.length) {
          // there are pre-selected options
          setOptions(data.options);
          setDefaultOptions(data.options);
          setInternalValue(data.options.map(option => option.value));
          setSelectedTotalCount(data.totalCount);
        }
      }

      if (!disabled) {
        // add other possible options
        loadOptions('');
        setSearchTerm('');
      }
    } catch (_) { setFetchingData(false); }
  };

  const calculateLoadMore = () => {
    const more = searchTotalCount - options.length;
    return more > 0 ? more : null;
  };

  const calculateExtraAmount = () => {
    if (selectedTotalCount === null) {
      // user manually selects values
      return internalValue.length - props.maxTagCount;
    } else {
      // values have been pre-selected before
      return selectedTotalCount - props.maxTagCount;
    }
  };

  const loadOptions = async (search, replaceExistingOptions = false) => {
    if (!getMoreOptions) {
      return;
    }
    setFetching(true);
    const [data] = await Promise.all([
      getMoreOptions(search, searchLimit, searchOffset),
      new Promise(resolve => setTimeout(resolve, 300)), // atrificial deplay to avoid flickering
    ]);
    setFetchingData(false);
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
    setSearchTotalCount(data.totalCount);
    setFetching(false);

    if (!getSelectedOptions && value) {
      setInternalValue(Array.isArray(value) ? value : [value]);
      setSelectedTotalCount(Array.isArray(value) ? value.length : 1);
    }
  };

  const onSearch = useMemo(() => {
    if (disabled) return null;
    return (search) => {
      if (!search) {
        // return
      }
      setSearchText(search);
      setFetching(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSearchOffset(0);
        setSearchTerm(search);
        if (search) {
          loadOptions(search, true);
        }
      }, timeout);
    };
  }, [getMoreOptions, timeout]);

  if (!props.filterOption) {
    restProps.filterOption = false;
    restProps.onSearch = onSearch;
    restProps.searchValue = searchText;
  }

  return (
    <div>
      <Select
        className="rc-select-customize-input"
        defaultOpen={true}
        labelInValue={true}
        getPopupContainer={trigger => trigger.parentElement}
        disabled={fetchingData}
        // notFoundContent={fetching ? <></> : 'Empty'}
        dropdownRender={menu => (
          <>
            {menu}
            {((options.length > 0 && loadMore > 0) || fetching)
            && (
              <>
                <hr />
                {fetching
                  ? <>Moment...</>
                  :                (
                      <button
                        style={{ width: '100%' }}
                        onClick={() => {
                          setSearchOffset(prev => prev + searchLimit);
                        }}
                      >
                        Show more
                      </button>
                    )}
              </>
            )}
          </>
        )}
        options={options || []}
        value={internalValue}
        onSelect={(value) => {
          !disabled && setInternalValue(prev => (props.mode != 'multiple') ? [value] : [...prev, value]);
        }}
        onDeselect={(value) => {
          !disabled && setInternalValue(prev => prev.filter(i => i !== value));
        }}
        maxTagPlaceholder={() => {
          return `+${extraAmount}...`;
        }}
        placeholder=""
        {...restProps}
      />
      {fetchingData && <>Fetching...</>}
    </div>
  );
};

export default DynamicSelect;
