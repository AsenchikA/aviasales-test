import { combineReducers } from 'redux';
import { ITicket } from '../models';
import { settings } from '../reducers/settings';
import { tickets } from '../reducers/tickets';
import { ISettings } from './settings';

export const rootReducer = combineReducers({
  settings,
  tickets,
});

export interface IRootState {
  tickets: ITicket[];
  settings: ISettings;
}
