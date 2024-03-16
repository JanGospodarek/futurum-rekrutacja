import { createReducer, createSelector, on } from '@ngrx/store';
import {
  addCampaign,
  editCampaign,
  deleteCampaign,
  init,
} from './campaigns.actions';
import { Campaign } from '../types';
import {
  readFromLocalStorage,
  wrtieToLocalStorage,
} from '../utils/localStorage';

export interface InitialState {
  campaigns: Campaign[];
}
export const initialState: InitialState = {
  campaigns: [],
};
export const campaignsReducer = createReducer(
  initialState,
  on(addCampaign, (state, { campaign }) => {
    const campaignCopy = { ...campaign };
    campaignCopy.id = Math.random().toString(36);
    const newState = {
      ...state,
      campaigns: [...state.campaigns, campaignCopy],
    };
    wrtieToLocalStorage(newState);
    return newState;
  }),
  on(editCampaign, (state, { campaign }) => {
    const newState = {
      ...state,
      campaigns: state.campaigns.map((c) =>
        c.id === campaign.id ? campaign : c
      ),
    };
    wrtieToLocalStorage(newState);
    return newState;
  }),
  on(deleteCampaign, (state, { id }) => {
    const newState = {
      ...state,
      campaigns: state.campaigns.filter((c) => c.id !== id),
    };
    wrtieToLocalStorage(newState);
    return newState;
  }),
  on(init, (state) => {
    const storedState = readFromLocalStorage();
    return storedState ? storedState : state;
  })
);
