import { useCallback, useMemo, useReducer } from 'react';

function createReducer(handlers) {
  return (state, action) => {
    const handler = handlers[action.type];
    return handler(state, action);
  };
}

const actions = {
  SET_SELECTED: 'SET_SELECTED',
  SET_SELECTED_OR_CREATE_AND_SET_SELECTED:
    'SET_SELECTED_OR_CREATE_AND_SET_SELECTED',
};

const optionsReducerHandlers = {
  [actions.SET_SELECTED]: (state, { selectedOption }) => {
    return {
      ...state,
      selectedOption,
    };
  },
  [actions.SET_SELECTED_OR_CREATE_AND_SET_SELECTED]: (
    state,
    { createdOption }
  ) => {
    const maybeOption =
      state.initOptions.find(
        (option) => option.value === createdOption.value
      ) ??
      state.createdOptions.find(
        (option) => option.value === createdOption.value
      );

    if (maybeOption) {
      return {
        ...state,
        selectedOption: maybeOption,
      };
    }

    return {
      ...state,
      selectedOption: createdOption,
      createdOptions: [...state.createdOptions, createdOption],
    };
  },
};

const setSelected = (selectedOption) => ({
  type: actions.SET_SELECTED,
  selectedOption,
});

const setSelectedOrCreateAndSetSelected = (createdOption) => ({
  type: actions.SET_SELECTED_OR_CREATE_AND_SET_SELECTED,
  createdOption,
});

export function useOptionsController({ options }) {
  const optionsReducer = createReducer(optionsReducerHandlers);

  const [reducerValue, dispatch] = useReducer(optionsReducer, {
    initOptions: options,
    createdOptions: [],
    selectedOption: options[0],
  });

  const handleDropdownChange = useCallback(
    (selectedOption) => {
      dispatch(setSelected(selectedOption));
    },
    [dispatch]
  );

  const handleUpdateCounter = useCallback(
    (count) => {
      dispatch(
        setSelectedOrCreateAndSetSelected({
          label: `Option ${count}`,
          value: count,
        })
      );
    },
    [dispatch]
  );

  const totalOptions = useMemo(() => {
    return [...reducerValue.initOptions, ...reducerValue.createdOptions];
  }, [reducerValue.initOptions, reducerValue.createdOptions]);

  return {
    totalOptions,
    selectedOption: reducerValue.selectedOption,
    handleDropdownChange,
    handleUpdateCounter,
  };
}
