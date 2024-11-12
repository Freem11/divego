import React, { useState, ReactNode, useRef, Dispatch, SetStateAction, useEffect, useMemo, useImperativeHandle } from 'react';

type Selection = string[];
type OnChangeCallback = (selected: Selection) => void | Dispatch<SetStateAction<Selection>>;

import './style.scss';
import style from './style.module.scss';
import SelectedBlock from './components/selectedBlock';


// function onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void {
//   const first = visibleIndices[0];
//   const last = visibleIndices[visibleIndices.length - 1];

//   switch (evt.key) {
//     // select active item
//     case KEY.ENTER: {
//       evt.preventDefault();
//       addItem(options[activeDescendantIndex]);
//       break;
//     }
//     // move down / up
//     case KEY.DOWN:
//     case KEY.UP: {
//       evt.preventDefault();
//       const sum = evt.key === KEY.UP ? -1 : 1;
//       const fallback = evt.key === KEY.UP ? last : first; // if at beginning, loop around to end, and vice-versa
//       const nextIndex = visibleIndices.indexOf(activeDescendantIndex) + sum;
//       const next = visibleIndices[nextIndex] !== undefined ? visibleIndices[nextIndex] : fallback;
//       setActiveDescendantIndex(next); // set to last index if at beginning of list
//       scrollTo(listRef.current, `#${optionId(next)}`);
//       break;
//     }
//     // move to start / end
//     case KEY.END:
//     case KEY.HOME: {
//       const next = evt.key === KEY.HOME ? first : last;
//       setActiveDescendantIndex(next);
//       scrollTo(listRef.current, `#${optionId(next)}`);
//       break;
//     }
//     // close on Escape
//     case KEY.ESC:
//       setIsOpen(false);
//       break;
//       // close if tabbing away
//     case KEY.TAB:
//       setIsOpen(false);
//       break;
//       // prevent typing if search hidden
//     default:
//       if (noSearch) {
//         evt.preventDefault();
//       }
//       break;
//   }
// }

// function scrollTo(wrapper: HTMLElement | null, selector: string): void {
//     if (wrapper) {
//       const el = wrapper.querySelector(selector);
//       if (el) {
//         el.scrollIntoView(false);
//       }
//     }
//   }

enum KEY {
  DOWN = 'ArrowDown',
  END = 'End',
  ENTER = 'Enter',
  ESC = 'Escape',
  HOME = 'Home',
  TAB = 'Tab',
  UP = 'ArrowUp',
}


type Option = {
  key:   string
  label: string
};

const defaultProps = {
  maxSelectedOptions: 1 as number,
  allowCreate:        false as boolean,
  placeholder:        'Select' as string,
  value:              [] as string[] | string,
  options:            [] as Option[],
  labelInValue:       false as boolean,
  debounceTimeout:    400 as number,
  disabled:           false as boolean,

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


    /// /////TODODODODODOD


  },
};

export type SelectProps = Partial<typeof defaultProps> & {
  name: string
};

type Values = Map<string, Option>;


const Select = React.forwardRef(function Select(_props: SelectProps, forwardedRef) {
  console.log('Render Select');


  const className = 'rsz';

  const props = { ...defaultProps, ..._props };

  // const options = props.options;
  const isMulti = props.maxSelectedOptions > 1;
  const initRef = useRef(false);
  const listRef = useRef<HTMLUListElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // const [activeDescendantIndex, setActiveDescendantIndex] = useState(0); // Active descendant. Numbers are easier to manipulate than element IDs.
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);


  const [value, setValue] = useState<Values | null>(null);
  const options: Values = useMemo(() => {
    return new Map(props.options.map(option => [option.key, option]));
  }, [props.options]);

  // console.log(options.values().map(option => option.key));


  const shouldDisplayCreate
    = props.allowCreate
    && searchText.length > 0;
    // && options.findIndex(option => option === searchText) === -1;

  const isMaxed = isMulti && (value?.size === props.maxSelectedOptions);

  // methods
  function elId(component: string) {
    return `rsz-${props.name}-${component}`;
  }

  function optionId(option: string) {
    return elId(`option-${option}`);
  }

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

  function selectItem(key: string) {
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
  }

  function deselctItem(key: string) {

  }

  // effect 1. maintain focus
  useEffect(() => {
    if (searchRef.current && isOpen) {
      searchRef.current.focus();
    }
  });


  useEffect(() => {
    // show the label of the selected option in search input
    if (props.modeSelectedBlocks === 'off' && !isMulti && value && searchRef.current) {
      const selectedOption = value.values().next().value;
      console.log('search updated to \'' + selectedOption?.label + '\'');
      if (selectedOption) {
        searchRef.current.value = selectedOption.label;
        // setSearchText(selectedOption.label);
      }
    }

    if (value === null) {
      setValue(new Map());
    }

    // prepare data to be passed to onChange(except first render)
    if (initRef.current && typeof props.onChange === 'function') {
      props.onChange({ target: { name: props.name, value: getFormattedValue() } });


      if (valueRef.current) {
        // const setValue = Object.getOwnPropertyDescriptor(valueRef.current.__proto__, 'value').set;
        // const event = new Event('change', { bubbles: true });

        // setValue.call(valueRef.current, Math.random().toString());
        // valueRef.current.dispatchEvent(event);

        // valueRef.current.value = Math.random().toString();
        // valueRef.current.dispatchEvent(new Event('change', { 'bubbles': true }));
      }
      // if (typeof ref === 'function') {
      //   if (valueRef?.current) {
      //     valueRef.current.value = value;
      //     ref(valueRef);
      //   }
      // } else if (ref) {
      //   ref.current = value;
      // }
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
      // setSearchText(search);
      console.log(search);
      if (search) {
        props.onSearch(search, options);
      }
    }, props.debounceTimeout);
  };

  return (
    <div
      aria-expanded={isOpen === true}
      aria-multiselectable={isMulti || undefined}
      className={className}
      role="listbox"
    >
      <div className={style.trigger} onClick={onTriggerClick}>

        {props.modeSelectedBlocks === 'on' && Array.from(value?.values() || []).map(option => (
          <SelectedBlock key={option.key} label={option.label} deselctItem={() => deselctItem(option.key)} />
        ))}

        <input
          onChange={e => onSearch(e.target.value)}
          ref={searchRef}
          type="search"
          // value={searchText}
          placeholder={!value?.size ? props.placeholder : undefined}
        />

        <button
          ref={triggerRef}

          onKeyDown={(e) => {
            if (e.key === KEY.DOWN) {
              setIsOpen(true);
            }
          }}
        >
          {isMulti ? `Select options for ${props.name}` : `Select an option for ${props.name}`}
          <span aria-hidden className="rsz__arrow">
            ↓
          </span>
        </button>
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div aria-label="Close dropdown" className="rsz__overlay" onClick={() => setIsOpen(false)} />

      <menu id={elId('menu')} className="rsz__dropdown-wrapper">
        <div className="rsz__dropdown">

          <div className="rsz__search-icon" />
          <ul className="rsz__option-list" ref={listRef}>
            {Array.from(options.values()).map((option: Option) => {
              const isSelected = value?.has(option.key);
              let ariaSelected: boolean | undefined = isSelected;
              if (ariaSelected === false && isMaxed === true) {
                ariaSelected = undefined;
              }
              return (
                <li className="rsz__option" key={option.key}>
                  <button
                    aria-selected={ariaSelected}
                    disabled={isMaxed && !isSelected}
                    id={optionId(option.key)}
                    onClick={() => selectItem(option.key)}
                    role="option"
                    type="button"
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
            {options.size > 0 && (
              <span className="rsz__no-results">
                No results for “
                {searchText}
                ”
              </span>
            )}
            {shouldDisplayCreate && (
              <li className="rsz__option">
                <button
                  className="rsz__create"
                  // data-highlighted={activeDescendantIndex === options.length || undefined}
                  disabled={isMaxed}
                  id={optionId('')}
                  onClick={() => selectItem(searchText)}
                  type="button"
                >
                  Create
                  {' '}
                  <span className="rsz__search-term">{searchText}</span>
                </button>
              </li>
            )}
            {props.allowCreate && searchText === '' && (
              <li className="rsz__option">
                <span className="rsz__create">Start typing to create an item</span>
              </li>
            )}
          </ul>
        </div>
      </menu>
    </div>
  );
});

export default Select;
