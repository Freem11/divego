import React, { useState, ReactNode, useRef, useEffect, useMemo, useCallback } from 'react';

import './style.scss';
import Dropdown from './components/dropdown';
import SelectedTag from './components/selectedTag';
import DropdownItem from './components/dropdownItem';
import getInitialValue from './utils/getInitialValue';
import getResultValue from './utils/getResultValue';

export type Option<T = object> = {
  key:          string
  label:        string
  data?:        T
  userCreated?: boolean
};

export type onChangeEvent<T = object> = {
  target: {
    name:  string | undefined
    value: Option<T> | Option<T>[] | string | string[]
  }
};

export type InitialValue = Option | Option[] | string | string[] | undefined;

export type SelectProps = Partial<typeof defaultProps> & {
  name?:     string
  onChange?: (value: any) => void
};

export type Values = Map<string, Option>;

const defaultProps = {
  maxSelectedOptions: 1 as number,
  allowCreate:        false as boolean,
  placeholder:        'Select' as string,
  disabled:           false as boolean,
  error:              null as any,

  /**
   * If true, the select is open and progress indicator is shown
   */
  isFetching:         false as boolean,

  /**
   * The value of the select
   */
  value:              [] as InitialValue,

  /**
   * The options of the select
   */
  options:            [] as Option[],

  /**
   * If true, the value passed to onChange is an object consisting of the key and label.
   * If false, the value passed to onChange is the key.
   */
  labelInValue:       false as boolean,

  /**
   * Debounce timeout for search
   */
  debounceTimeout:    400 as number,

  /**
   * Css class for the select container
   */
  className:          'ssrc-select' as string,

  /**
   * Component to render on the left side of the trigger.
   * Typically an icon representing what this select is for
   */
  iconLeft:           null as React.ReactNode,

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
  iconSelectArrow:    true as ReactNode | boolean,

  /**
   * Selected tag is a visual block in the trigger area representing selected item(s).
   * In case of multiselect it is a list of selected blocks.
   * - on: selected items appear as tags in the trigger
   * - off: selected items appear as labels in search input
   * - empty: selected items do not appear neither as tags nor as labels. Search input resets to empty
   */
  modeSelectedTags: 'off' as 'on' | 'off' | 'empty',

  /**
   * When to open dropdown
   * - onClick: dropdown opens when trigger is clicked, just like regular select
   * - onChange: dropdown opens when user starts typing in search input
   */
  modeDropdownOpen: 'onChange' as 'onClick' | 'onChange',

  /**
   * If true, onChange event is triggered when user selects an already selected option
   */
  triggerOnChangeWhenReselect: false as boolean,

  onSearch:           (search: string) => {
    // TODO: implement search by static options
  },
};

const Select = React.forwardRef<HTMLInputElement, SelectProps>(function Select(_props: SelectProps, forwardedRef) {
  const props = { ...defaultProps, ..._props };

  const initRef     = useRef(false);
  const searchRef   = useRef<HTMLInputElement>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const timeoutRef  = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const searchMirrorRef = useRef<HTMLSpanElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const options: Values = useMemo(() => {
    return new Map(props.options.map(option => [option.key, option]));
  }, [props.options]);

  const [value, setValue] = useState<Values>(getInitialValue(props.value, options));

  const isMulti = props.maxSelectedOptions > 1;

  const showSelectedTags = props.modeSelectedTags === 'on' || isMulti;

  const shouldDisplayCreate = Boolean(props.allowCreate && searchRef?.current?.value);


  // effect: maintain focus
  useEffect(() => {
    if (searchRef.current && isOpen) {
      searchRef.current.focus();
    }
  });


  // effect: close dropdown if click outside
  useEffect(() => {
    adjustSearchInputWidth();
    const handleWrapperClick = (e: MouseEvent) => {
      setIsOpen((prev) => {
        if (!prev) {
          // not need to close if none is open
          return prev;
        }
        if (e.target instanceof Node && wrapperRef?.current?.contains(e.target)) {
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
    if (props.modeSelectedTags === 'off' && !isMulti && value) {
      const selectedOption = value.values().next().value;
      if (selectedOption) {
        setSearchInputValue(selectedOption.label);
      }
    }

    if (props.modeSelectedTags === 'empty') {
      setSearchInputValue('');
    }

    // prepare data to be passed to onChange(except first render)
    const result = getResultValue(value, props.labelInValue, isMulti);
    if (initRef.current && typeof props.onChange === 'function') {
      props.onChange({ target: { name: props.name, value: result } });
    }

    initRef.current = true;
  }, [value]);


  const adjustSearchInputWidth = () => {
    // to make input's width match its content
    if (searchMirrorRef.current && searchRef.current) {
      searchMirrorRef.current.innerHTML = searchRef.current.value;
      searchRef.current.style.width = 'auto'; // Reset width to recalculate
      searchRef.current.style.width = (searchMirrorRef.current.offsetWidth + 10)  + 'px';
    }
  };

  const setSearchInputValue = (value: string) => {
    if (searchRef.current) {
      searchRef.current.value = value;
      adjustSearchInputWidth();
    }
  };

  const onTriggerClick = () => {
    if (!options.size) {
      searchRef.current?.focus();
    }
    if (props.modeDropdownOpen === 'onClick' || options.size || shouldDisplayCreate) {
      setIsOpen(!isOpen);
    }
  };


  const onSearch = (search: string) => {
    if (props.modeDropdownOpen === 'onChange' && !isOpen) {
      setIsOpen(true);
    }

    adjustSearchInputWidth();

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (search) {
        props.onSearch(search);
      }
    }, props.debounceTimeout);
  };


  const selectItem = useCallback((key: string) => {
    if (showSelectedTags && searchRef?.current) {
      setSearchInputValue('');
    }
    setValue((prev): Values => {
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
        if (!props.triggerOnChangeWhenReselect && prev.has(key)) {
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

  const createItem = useCallback((value: string) => {
    if (showSelectedTags && searchRef?.current) {
      setSearchInputValue('');
    }
    setValue((prev) => {
      if (!prev || !value) {
        return prev;
      }
      if (prev.has(value)) {
        return prev;
      }
      const result = new Map(prev);
      if (prev.size >= props.maxSelectedOptions) {
        result.clear();
      }

      result.set(value, { key: value, label: value, userCreated: true });
      return result;
    });
  }, []);

  const getPlaceholder = () => {
    if (showSelectedTags) {
      return value?.size ? undefined : props.placeholder;
    } else {
      return searchRef?.current?.value ? undefined : props.placeholder;
    }
  };

  return (
    <div
      ref={wrapperRef}
      aria-expanded={isOpen === true}
      aria-invalid={!!props.error}
      aria-multiselectable={isMulti || undefined}
      className={props.className}
      role="listbox"
    >
      <input type="hidden" name={props.name} ref={forwardedRef} value={JSON.stringify(getResultValue(value, props.labelInValue, isMulti)) ?? ''} />
      <span style={{ visibility: 'hidden', position: 'absolute' }} ref={searchMirrorRef}></span>

      <div className="ssrc-select_trigger" onClick={onTriggerClick}>

        {props.iconLeft && <i className="ssrc-select_icon-left">{props.iconLeft}</i>}

        <div className="ssrc-select_trigger-content">
          {showSelectedTags && value.size > 0 && (
            Array.from(value?.values() || []).map(option => (
              <SelectedTag key={option.key} label={option.label} deselctItem={() => deselctItem(option.key)} />
            ))
          )}

          <input
            onChange={e => onSearch(e.target.value)}
            ref={searchRef}
            type="search"
            placeholder={getPlaceholder()}
          />
        </div>

        {props.iconSelectArrow && (
          <span className="ssrc-select_arrow">
            {props.iconSelectArrow === true ? '↓' : props.iconSelectArrow}
          </span>
        )}

        <button className="ssrc-select_trigger-button"></button>
      </div>

      <menu className="ssrc-select_dropdown-wrapper">
        {(isOpen || shouldDisplayCreate) && (
          <props.dropdownComponent
            options={options}
            searchText={searchRef.current?.value || ''}
            shouldDisplayCreate={shouldDisplayCreate}
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
