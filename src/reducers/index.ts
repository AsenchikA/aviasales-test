import { combineReducers } from 'redux';
import { settings } from '../reducers/settings';
import { ITicketsModel, tickets } from '../reducers/tickets';
import { ISettings } from './settings';

export const rootReducer = combineReducers({
  settings,
  tickets,
});

export interface IRootState {
  tickets: ITicketsModel;
  settings: ISettings;
}
