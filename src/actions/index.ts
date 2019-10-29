import { Dispatch } from 'redux';
import { api } from '../api/api';
import { ESortingTypes, ITicket, ITicketSegment } from '../models';
import { IRootState } from '../reducers';

interface ITicketResponse {
  tickets: ITicket[];
  stop: boolean;
}

class Actions {
  public types = {
    GET_TICKETS_SUCCESS: 'GET_TICKETS_SUCCESS',
    SET_FILTERED_TICKETS: 'SET_FILTERED_TICKETS',
    SET_SORTING_OPTION: 'SET_SORTING_OPTION',
  };

  public getData = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
      const searchIdResponse: {searchId: string} = await api.getSearchId();
      this.getTickets(searchIdResponse.searchId)(dispatch, getState);
    } catch (error) {
      throw new Error(error);
    }
  }

  public getTickets = (searchId: string) => (dispatch: Dispatch, getState: () => IRootState) => {
    api.getTickets(searchId)
      .then((response: ITicketResponse) => {
        dispatch({
          payload: response.tickets,
          type: this.types.GET_TICKETS_SUCCESS,
        });

        if (!response.stop) {
          this.getTickets(searchId)(dispatch, getState);
        }
      })
      .catch((error) => {
        this.getTickets(searchId)(dispatch, getState);
      });
  }

  public setSortingOption = (option: ESortingTypes) => {
    return {
      payload: option,
      type: this.types.SET_SORTING_OPTION,
    };
  }

  public sortTickets = () => (dispatch: Dispatch, getState: () => IRootState) => {
    const {
      settings: {
        sortingOption,
      },
      tickets,
    } = getState();

    const sortedTickets = [...tickets];

    switch (sortingOption) {
      case ESortingTypes.CHEAP:
        sortedTickets.sort((a, b) => (a.price - b.price));
        break;
      case ESortingTypes.QUICK:
        const reducer = (duration: number, value: ITicketSegment): number => (duration + value.duration);
        sortedTickets.sort((a, b) => (a.segments.reduce(reducer, 0) - b.segments.reduce(reducer, 0)));
        break;
    }

    dispatch({
      payload: sortedTickets,
      type: this.types.SET_FILTERED_TICKETS,
    });
  }
}

export const actions = new Actions();
