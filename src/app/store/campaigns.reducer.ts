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
  balance: number;
}
export const initialState: InitialState = {
  campaigns: [],
  balance: 100000,
};
export const campaignsReducer = createReducer(
  initialState,
  on(addCampaign, (state, { campaign }) => {
    const campaignCopy = { ...campaign };
    campaignCopy.id = Math.random().toString(36);

    const newState = {
      ...state,
      balance: state.balance - campaignCopy.fundAmount,
      campaigns: [...state.campaigns, campaignCopy],
    };
    wrtieToLocalStorage(newState);
    return newState;
  }),

  on(editCampaign, (state, { campaign }) => {
    const prevFundAmount = state.campaigns.find(
      (c) => c.id === campaign.id
    )!.fundAmount;
    const diff = prevFundAmount - campaign.fundAmount;
    const newBalance = state.balance + diff;
    const newState = {
      ...state,
      balance: newBalance,
      campaigns: state.campaigns.map((c) =>
        c.id === campaign.id ? campaign : c
      ),
    };
    wrtieToLocalStorage(newState);
    return newState;
  }),

  on(deleteCampaign, (state, { id }) => {
    const prevFundAmount = state.campaigns.find((c) => c.id === id)!.fundAmount;

    const newState = {
      ...state,
      balance: state.balance + prevFundAmount,
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
