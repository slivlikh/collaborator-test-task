import { Dropdown, Card as CardUI } from '../../ui/index.js';
import { ButtonCounter } from './ButtonCounter.jsx';
import { useOptionsController } from './useOptionsController.js';

export const Card = ({ title, description, options }) => {
  const {
    handleUpdateCounter,
    handleDropdownChange,
    totalOptions,
    selectedOption,
  } = useOptionsController({ options });

  return (
    <CardUI>
      <CardUI.Title>{title}</CardUI.Title>
      <Dropdown
        options={totalOptions}
        selectedOption={selectedOption}
        onChange={handleDropdownChange}
      />
      <CardUI.Description>{description}</CardUI.Description>

      <ButtonCounter
        onCounterUpdated={handleUpdateCounter}
        currentCount={selectedOption.value}
      >
        {selectedOption.label} is selected
      </ButtonCounter>
    </CardUI>
  );
};
