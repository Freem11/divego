// import { Button, Divider, Select, Spin, Empty, Space } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';


export default function DynamicSelect({ getMoreOptions, getSelectedOptions, timeout = 800, value = null, reset, searchLimit = 50, disabled, fetchType, ...props }) {
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
        if (!data) { return; }

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
      getMoreOptions(search, searchLimit, searchOffset, props.excludeCurrentUser, fetchType),
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
      setSearchText(search);
      setFetching(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSearchOffset(0);
        setSearchTerm(search);
        loadOptions(search, true);
      }, timeout);
    };
  }, [getMoreOptions, timeout]);

  if (!props.filterOption) {
    props.filterOption = false;
    props.onSearch = onSearch;
    props.searchValue = searchText;
  }

  return <div className="s-rounded bg-gray columns bg-light p-2 my-2 rounded-4">
    <div className='text-primary'>AAA</div>
    </div>;
  // return (
  //   <div style={{ width: '100%' }}>
  //     <select
  //       disabled={fetchingData}
  //       notFoundContent={fetching ? <></> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
  //       dropdownRender={menu => (
  //         <>
  //           {menu}
  //           {((options.length > 0 && loadMore > 0) || fetching)
  //           && (
  //             <>
  //               <Divider style={{ margin: '8px 0' }} />
  //               {fetching
  //                 ? <Spin style={{ width: '100%' }} size="small" />
  //                 :                (
  //                     <Button
  //                       style={{ width: '100%' }}
  //                       type="text"
  //                       onClick={() => {
  //                         setSearchOffset(prev => prev + searchLimit);
  //                       }}
  //                     >
  //                       Show more
  //                     </Button>
  //                   )}
  //             </>
  //           )}
  //         </>
  //       )}
  //       options={options || []}
  //       value={internalValue}
  //       onSelect={(value) => {
  //         !disabled && setInternalValue(prev => (props.mode != 'multiple') ? [value] : [...prev, value]);
  //       }}
  //       onDeselect={(value) => {
  //         !disabled && setInternalValue(prev => prev.filter(i => i !== value));
  //       }}
  //       maxTagPlaceholder={() => {
  //         return `+${extraAmount}...`;
  //       }}
  //       placeholder=""
  //       {...props}
  //     />
  //     {fetchingData && <Spin style={{ width: '100%' }} />}
  //   </div>
  // );
};

{ /* <div className="s-rounded bg-gray columns bg-light p-2 my-2 rounded-4">
<div className="col-3 col-md-4 hide-lg">
  <select className="form-select border-0 bg-transparent">
    <option>All Categories</option>
    <option>Groceries</option>
    <option>Drinks</option>
    <option>Chocolates</option>
  </select>
</div>
<div className="col-8 col-md-7">
  <form id="search-form" className="text-center" action="index.html" method="post">
    <input type="text" className="form-control border-0 bg-transparent" placeholder="Search for more than 20,000 products" />
  </form>
</div>
<div className="col-1">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" /></svg>
</div>
</div> */ }
