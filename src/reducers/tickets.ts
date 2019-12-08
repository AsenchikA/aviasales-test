import { ITicket } from '../models';

interface IGetTicketsAction {
  type: 'GET_TICKETS_SUCCESS';
  payload: ITicket[];
}

interface ISetFilteredTicketsAction {
  type: 'SET_FILTERED_TICKETS';
  payload: ITicket[];
}

type ITicketsAction = IGetTicketsAction & ISetFilteredTicketsAction;

export interface ITicketsModel {
  initialList: ITicket[];
  filteredList: ITicket[];
}

export const tickets = (
  state: ITicketsModel = { initialList: [], filteredList: [] },
  action: ITicketsAction,
): ITicketsModel => {
  switch (action.type) {
    case 'GET_TICKETS_SUCCESS':
      return {
        ...state,
        initialList: state.initialList.concat(action.payload),
      };
    case 'SET_FILTERED_TICKETS':
      return {
        ...state,
        filteredList: action.payload,
      };
    default:
      return state;
  }
};
