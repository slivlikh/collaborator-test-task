import { useEffect, useEffectEvent } from 'react';

const KEYS = {
  ARROW_DOWN: 'ArrowDown',
  ARROW_UP: 'ArrowUp',
  HOME: 'Home',
  END: 'End',
  ENTER: 'Enter',
};

export function useKeyboardNavigation(
  isOpen,
  listBoxElementRef,
  options,
  onSelectOption
) {
  const handleKeydown = useEffectEvent((e) => {
    const optionsElements = e.currentTarget.children;

    switch (e.key) {
      case KEYS.ARROW_DOWN: {
        e.target.nextElementSibling?.focus();
        break;
      }
      case KEYS.ARROW_UP: {
        e.target.previousElementSibling?.focus();
        break;
      }
      case KEYS.HOME: {
        optionsElements[0]?.focus();
        break;
      }
      case KEYS.END: {
        optionsElements[optionsElements.length - 1]?.focus();
        break;
      }
      case KEYS.ENTER: {
        const current = Array.from(optionsElements).indexOf(e.target);
        if (current > -1) {
          onSelectOption(options[current]);
          break;
        }
        // unexpected behavior, add logger
        break;
      }
      default:
        return;
    }
    e.preventDefault();
  });

  useEffect(() => {
    if (!listBoxElementRef.current || !isOpen) {
      return;
    }

    const abortController = new AbortController();
    listBoxElementRef.current.addEventListener(
      'keydown',
      (e) => {
        return handleKeydown(e);
      },
      { signal: abortController.signal }
    );

    return () => {
      abortController.abort();
    };
  }, [isOpen, listBoxElementRef]);
}
