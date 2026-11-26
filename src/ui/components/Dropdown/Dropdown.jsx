import './Dropdown.css';
import { useId, useRef } from 'react';
import { Button } from '../Button/Button.jsx';
import { usePopoverState } from '../../hooks/usePopoverState.js';
import { useKeyboardNavigation } from './useKeyboardNavigation.js';

export const Dropdown = ({
  options,
  selectedOption,
  placeholder = 'Select',
  onChange,
  ariaLabel = '',
}) => {
  const popoverId = useId();
  const popoverElementRef = useRef(null);
  const triggerElementRef = useRef(null);
  const listBoxElementRef = useRef(null);

  const isOpen = usePopoverState(popoverElementRef);

  const handleSelectOption = (option) => {
    popoverElementRef.current?.hidePopover();
    triggerElementRef.current?.focus();
    onChange(option);
  };

  useKeyboardNavigation(isOpen, listBoxElementRef, options, handleSelectOption);

  return (
    <div className={'dropdown'}>
      <Button
        className={`dropdown__toggle`}
        type="button"
        popoverTarget={popoverId}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        ref={triggerElementRef}
      >
        {selectedOption ? selectedOption.label : placeholder}{' '}
        <span
          className={`toggle__indicator ${isOpen && 'toggle__indicator--open'}`}
        ></span>
      </Button>

      <div
        popover="auto"
        ref={popoverElementRef}
        className={`dropdown__menu`}
        id={popoverId}
      >
        <ul
          role="listbox"
          className="dropdown__menu-container"
          aria-label={ariaLabel}
          ref={listBoxElementRef}
        >
          {options.map((option) => {
            const isSelected = option.value === selectedOption?.value;

            return (
              <li
                aria-labelledby="city-label"
                role="option"
                tabIndex={isSelected ? 0 : -1}
                aria-selected={isSelected}
                className={`dropdown__item ${isSelected ? 'dropdown__item--selected' : ''}`}
                key={option.value}
                onClick={() => {
                  handleSelectOption(option);
                }}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
