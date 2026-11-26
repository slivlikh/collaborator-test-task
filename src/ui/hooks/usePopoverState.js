import { useEffect, useState } from 'react';

export function usePopoverState(popoverElementRef) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (popoverElementRef.current) {
      const abortController = new AbortController();

      popoverElementRef.current.addEventListener(
        'toggle',
        (event) => {
          setIsOpen(event.newState === 'open');
        },
        { signal: abortController.signal }
      );

      return () => {
        abortController.abort();
      };
    }
  }, []);

  return isOpen;
}
