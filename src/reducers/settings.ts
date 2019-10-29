import { ESortingTypes } from '../models';

export interface ISettings {
  sortingOption: ESortingTypes;
}

interface ISettingsAction {
  type: 'SET_SORTING_OPTION';
  payload: ESortingTypes;
}

export const settings = (
  state: ISettings = { sortingOption: ESortingTypes.CHEAP },
  action: ISettingsAction,
): ISettings => {
  switch (action.type) {
    case 'SET_SORTING_OPTION':
      return {
        ...state,
        sortingOption: action.payload,
      };
    default:
      return state;
  }
};
