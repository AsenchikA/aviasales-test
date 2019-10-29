import { ITicket } from '../models';

interface ITicketsAction {
  type: 'GET_TICKETS_SUCCESS';
  payload: ITicket[];
}

export const tickets = (state: ITicket[] = [], action: ITicketsAction): ITicket[] => {
  switch (action.type) {
    case 'GET_TICKETS_SUCCESS':
      return state.concat(action.payload);
    default:
      return state;
  }
};
