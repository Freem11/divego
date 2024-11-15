import React, { useState, ReactNode, useRef, Dispatch, SetStateAction, useEffect, useMemo, useImperativeHandle, useCallback } from 'react';

import './style.scss';
import SelectedBlock from './components/selectedBlock';
import SelectView from './view';
import DropdownItem from './components/dropdownItem';
import Dropdown from './components/dropdown';

export type Option = {
  key:   string
  label: string
};
export type SelectProps = Partial<typeof defaultProps> & {
  name: string
};

export type Values = Map<string, Option>;


const defaultProps = {
  maxSelectedOptions: 1 as number,
  allowCreate:        false as boolean,
  placeholder:        'Select' as string,
  value:              [] as string[] | string,
  options:            [] as Option[],
  labelInValue:       false as boolean,
  debounceTimeout:    400 as number,
  disabled:           false as boolean,
  className:          'ssrc-select' as string,

  /**
   * Render function for each item in the dropdown
   */
  dropdownItemComponent: DropdownItem,

  /**
   * Render function for the dropdown
   */
  dropdownComponent: Dropdown,

  /**
   * Small arrow at the right side of the trigger indicing that this is select, not a regular input
   */
  selectArrowIcon:    true as ReactNode | boolean,

  /**
   * Selected block is a visual block in the trigger area representing selected item(s).
   * In case of multiselect it is a list of selected blocks.
   * - on: selected items appear as blocks in trigger
   * - off: selected items appear as labels in search input
   */
  modeSelectedBlocks: 'off' as 'on' | 'off',

  /**
   * When to open dropdown
   * - onClick: dropdown opens when trigger is clicked, just like regular select
   * - onChange: dropdown opens when user starts typing in search input
   */
  modeDropdownOpen: 'onChange' as 'onClick' | 'onChange',
  onChange:           (value) => {},
  onSearch:           (search: string, options: Option[]) => {


    /// /////TODODODODODOD fieldToSearch: label


  },
};


// const Select = React.forwardRef(function Select(_props: SelectProps, forwardedRef) {
//   // console.log('Render Select');
//   return <div>AAA</div>;
// });
const Select = React.forwardRef(function Select(_props: SelectProps, forwardedRef) {
  console.log('Render Select');


  const props = { ...defaultProps, ..._props };

  // const options = props.options;
  const isMulti     = props.maxSelectedOptions > 1;
  const initRef     = useRef(false);
  const valueRef    = useRef<HTMLInputElement>(null);
  const searchRef   = useRef<HTMLInputElement>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const timeoutRef  = useRef<ReturnType<typeof setInterval> | undefined>(undefined);


  // const [activeDescendantIndex, setActiveDescendantIndex] = useState(0); // Active descendant. Numbers are easier to manipulate than element IDs.
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);


  const [value, setValue] = useState<Values | null>(null);
  const options: Values = useMemo(() => {
    return new Map(props.options.map(option => [option.key, option]));
  }, [props.options]);

  // console.log(options.values().map(option => option.key));


  const isMaxed = isMulti && (value?.size === props.maxSelectedOptions);

  const showSelectedBlocks = props.modeSelectedBlocks === 'on' || isMulti;

  const shouldDisplayCreate
  = props.allowCreate
  && searchRef?.current?.value;
  // && options.findIndex(option => option === searchText) === -1;


  // effect: maintain focus
  useEffect(() => {
    if (searchRef.current && isOpen) {
      searchRef.current.focus();
    }
  });

  // effect: close dropdown if click outside
  useEffect(() => {
    const handleWrapperClick = (e) => {
      setIsOpen((prev) => {
        if (!prev) {
          // not need to close if none is open
          return prev;
        }
        if (wrapperRef?.current?.contains(e.target)) {
          // no need to close dropdown if click inside modal wrapper
          return prev;
        }

        return false;
      });
    };

    window.addEventListener('click', handleWrapperClick);
    return () => {
      window.removeEventListener('click', handleWrapperClick);
    };
  }, []);

  // effect: prepare data to be passed to onChange
  useEffect(() => {
    // show the label of the selected option in search input
    if (props.modeSelectedBlocks === 'off' && !isMulti && value && searchRef.current) {
      const selectedOption = value.values().next().value;
      if (selectedOption) {
        searchRef.current.value = selectedOption.label;
      }
    }

    if (value === null) {
      setValue(new Map());
    }

    // prepare data to be passed to onChange(except first render)
    if (initRef.current && typeof props.onChange === 'function') {
      props.onChange({ target: { name: props.name, value: getFormattedValue() } });
    }
    initRef.current = true;
  }, [value]);

  const onTriggerClick = () => {
    if (props.modeDropdownOpen === 'onClick' || options.size) {
      setIsOpen(!isOpen);
    }
  };

  const onSearch = (search: string) => {
    if (props.modeDropdownOpen === 'onChange' && !isOpen) {
      setIsOpen(true);
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      console.log(search);
      if (search) {
        props.onSearch(search, options);
      }
    }, props.debounceTimeout);
  };

  // Methods
  const getFormattedValue = () => {
    const result: (string | Option)[] = [];
    if (!value) {
      return null;
    }
    value.forEach((option) => {
      if (props.labelInValue) {
        result.push(option);
      } else {
        result.push(option.key);
      }
    });

    return isMulti ? result : result[0];
  };

  const selectItem = useCallback((key: string) => {
    setValue((prev): Values | null => {
      if (prev === null) {
        // value should already be initialized
        console.error('value should already be initialized');
        return prev;
      }

      const option = options.get(key);
      if (!option) {
        console.error(`Could not find option with key: "${key}"`);
        return prev;
      }

      if (props.maxSelectedOptions === 1) {
        // if user clicks on selected item - do not trigger onChange
        if (prev.has(key)) {
          return prev;
        }

        return new Map([[key, option]]);
      }

      // multiselect
      if (prev.size >= props.maxSelectedOptions) {
        // do not allow more than maxSelectedOptions
        return prev;
      }

      const value = new Map(prev);
      if (value.has(key)) {
        // user clicks on already selected option - deselect it
        value.delete(key);
        return value;
      }

      // select option
      value.set(key, option);
      return value;
    });

    if (!isMulti) {
      // hide dropdown after selection
      setIsOpen(false);
    }
  }, [value, options]);

  function deselctItem(key: string) {
    setValue((prev) => {
      if (prev && prev.has(key)) {
        const value = new Map(prev);
        value.delete(key);
        return value;
      }
      return prev;
    });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {

  }

  const createItem = useCallback((value: string) => {

  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-expanded={isOpen === true}
      aria-multiselectable={isMulti || undefined}
      className={props.className}
      role="listbox"
    >
      <input type="hidden" name={props.name} ref={valueRef} />

      <div className="trigger" onClick={onTriggerClick}>

        {showSelectedBlocks && Array.from(value?.values() || []).map(option => (
          <SelectedBlock key={option.key} label={option.label} deselctItem={() => deselctItem(option.key)} />
        ))}

        <input
          onKeyDown={onKeyDown}
          onChange={e => onSearch(e.target.value)}
          ref={searchRef}
          type="search"
          placeholder={!value?.size ? props.placeholder : undefined}
        />

        <button className="trigger-button">
          {isMulti ? `Select options for ${props.name}` : `Select an option for ${props.name}`}

          {props.selectArrowIcon && (
            <span className="arrow">
              {props.selectArrowIcon === true ? '↓' : props.selectArrowIcon}
            </span>
          )}
        </button>
      </div>

      <menu className="dropdown-wrapper">
        {isOpen && (
          <props.dropdownComponent
            options={options}
            searchText={searchRef.current?.value || ''}
            shouldDisplayCreate={!!shouldDisplayCreate}
            createItem={createItem}
          >
            {Array.from(options.values()).map((option: Option) => {
              const isSelected = value?.has(option.key);
              return <props.dropdownItemComponent key={option.key} option={option} selected={!!isSelected} onSelect={selectItem} />;
            })}

          </props.dropdownComponent>
        )}
      </menu>
    </div>
  );
});

export default Select;
