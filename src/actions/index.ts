import { Dispatch } from 'redux';
import { api } from '../api/api';
import { EFilterOptions, ESortingTypes, ITicket, ITicketSegment } from '../models';
import { IRootState } from '../reducers';

interface ITicketResponse {
  tickets: ITicket[];
  stop: boolean;
}

class Actions {
  public types = {
    GET_TICKETS_SUCCESS: 'GET_TICKETS_SUCCESS',
    SET_FILTERED_TICKETS: 'SET_FILTERED_TICKETS',
    SET_FILTER_LIST: 'SET_FILTER_LIST',
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
      .then(async (response: ITicketResponse) => {
        await dispatch({
          payload: response.tickets,
          type: this.types.GET_TICKETS_SUCCESS,
        });

        this.sortAndFilter()(dispatch, getState);

        if (!response.stop) {
          this.getTickets(searchId)(dispatch, getState);
        }
      })
      .catch((error) => {
        this.getTickets(searchId)(dispatch, getState);
      });
  }

  public setSorting = (option: ESortingTypes) => async (dispatch: Dispatch, getState: () => IRootState) => {
    const {
      tickets: {
        filteredList,
      },
    } = getState();

    dispatch({
      payload: option,
      type: this.types.SET_SORTING_OPTION,
    });

    this.sortTickets(filteredList, option)(dispatch);
  }

  public setFilter = (option: EFilterOptions) => (dispatch: Dispatch, getState: () => IRootState) => {
    const {
      settings: {
        filterList,
      },
    } = getState();

    let newFilterList = [...filterList];
    const optionIndex = newFilterList.findIndex((item) => item === option);

    if (option === EFilterOptions.ALL) {
      if (optionIndex !== -1) {
        newFilterList = [];
      } else {
        newFilterList = [];
        Object.values(EFilterOptions).forEach((filterOption) => {
          if (typeof filterOption === 'number') {
            newFilterList.push(filterOption);
          }
        });
      }
    } else {
      if (optionIndex !== -1) {
        newFilterList.splice(optionIndex, 1);

        const allOptionIndex = newFilterList.findIndex((item) => item === EFilterOptions.ALL);
        if (allOptionIndex !== -1) {
          newFilterList.splice(allOptionIndex, 1);
        }
      } else {
        newFilterList.push(option);
      }
    }

    dispatch({
      payload: newFilterList,
      type: this.types.SET_FILTER_LIST,
    });

    this.sortAndFilter()(dispatch, getState);
  }

  public sortAndFilter = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const {
      settings: {
        sortingOption,
        filterList,
      },
      tickets: {
        initialList,
      },
    } = getState();

    const filteredTickets = await this.filterTickets(filterList, initialList);
    this.sortTickets(filteredTickets, sortingOption)(dispatch);
  }

  private sortTickets = (filteredTickets: ITicket[], sortingOption: ESortingTypes) => (dispatch: Dispatch) => {
    const sortedTickets = [...filteredTickets];

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

  private filterTickets = (filterList: EFilterOptions[], initialList: ITicket[]) => {

    let filteredList: ITicket[] = [];
    let currentFilteredList = [];
    let isValidTicket = false;

    if (!filterList.length || filterList.findIndex((filter) => filter === EFilterOptions.ALL) !== -1) {
      filteredList = [...initialList];
    } else {
      filterList.forEach((filter) => {
        switch (filter) {
          case EFilterOptions.WITHOUT:
            currentFilteredList = initialList.filter((ticket) => {
              return ticket.segments.every((segment) => {
                return !segment.stops.length;
              });
            });
            filteredList = filteredList.concat(currentFilteredList);
            break;

          case EFilterOptions.ONE:
            currentFilteredList = initialList.filter((ticket) => {
              let countStops = 0;
              isValidTicket = false;
              ticket.segments.forEach((segment) => {
                if (segment.stops.length === 1) {
                  isValidTicket = true;
                }
                countStops += segment.stops.length;
              });
              return isValidTicket && countStops <= 2;
            });
            filteredList = filteredList.concat(currentFilteredList);
            break;

          case EFilterOptions.TWO:
            currentFilteredList = initialList.filter((ticket) => {
              let countStops = 0;
              isValidTicket = false;
              ticket.segments.forEach((segment) => {
                if (segment.stops.length === 2) {
                  isValidTicket = true;
                }
                countStops += segment.stops.length;
              });
              return isValidTicket && countStops <= 4;
            });
            filteredList = filteredList.concat(currentFilteredList);
            break;

          case EFilterOptions.THREE:
            currentFilteredList = initialList.filter((ticket) => {
              let countStops = 0;
              isValidTicket = false;
              ticket.segments.forEach((segment) => {
                if (segment.stops.length === 3) {
                  isValidTicket = true;
                }
                countStops += segment.stops.length;
              });
              return isValidTicket && countStops <= 6;
            });
            filteredList = filteredList.concat(currentFilteredList);
            break;
        }
      });
    }

    return filteredList;
  }
}

export const actions = new Actions();
