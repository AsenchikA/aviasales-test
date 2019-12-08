import { EFilterOptions, ESortingTypes } from '../models';

export interface ISettings {
  sortingOption: ESortingTypes;
  filterList: EFilterOptions[];
}

interface ISetSortingAction {
  type: 'SET_SORTING_OPTION';
  payload: ESortingTypes;
}

interface ISetFilterAction {
  type: 'SET_FILTER_LIST';
  payload: EFilterOptions;
}

type ISettingsAction = ISetSortingAction & ISetFilterAction;

export const settings = (
  state: ISettings = { sortingOption: ESortingTypes.CHEAP, filterList: [] },
  action: ISettingsAction,
): ISettings => {
  switch (action.type) {
    case 'SET_SORTING_OPTION':
      return {
        ...state,
        sortingOption: action.payload,
      };
    case 'SET_FILTER_LIST':
      return {
        ...state,
        filterList: action.payload,
      };
    default:
      return state;
  }
};
