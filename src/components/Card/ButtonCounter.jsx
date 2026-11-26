import { Button } from '../../ui/index.js';

export const ButtonCounter = ({ children, currentCount, onCounterUpdated }) => {
  return (
    <Button
      onClick={() => {
        onCounterUpdated(currentCount + 1);
      }}
    >
      {children}
    </Button>
  );
};
