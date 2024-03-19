import { createReducer, on } from '@ngrx/store';
import {
  addCampaign,
  editCampaign,
  deleteCampaign,
  init,
  toggleCampaign,
} from './campaigns.actions';
import { type InitialState } from '../app/types';
import {
  readFromLocalStorage,
  wrtieToLocalStorage,
} from '../utils/localStorage';
import * as uuid from 'uuid';

export const initialState: InitialState = {
  campaigns: [],
  balance: 100000,
};

export const campaignsReducer = createReducer(
  initialState,
  on(addCampaign, (state, { campaign }) => {
    const campaignCopy = { ...campaign };
    campaignCopy.id = uuid.v4();

    const newState = {
      ...state,
      balance: state.balance - campaignCopy.fundAmount,
      campaigns: [...state.campaigns, campaignCopy],
    };
    wrtieToLocalStorage(newState);
    return newState;
  }),

  on(editCampaign, (state, { campaign }) => {
    const prevState = state.campaigns.find((c) => c.id === campaign.id)!;
    const diff = prevState.fundAmount - campaign.fundAmount;
    let newBalance = state.balance;

    if (campaign.status === 'on') newBalance += diff;

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
    const prevState = state.campaigns.find((c) => c.id === id)!;
    const newState = {
      ...state,
      balance:
        prevState.status === 'on'
          ? state.balance + prevState.fundAmount
          : state.balance,
      campaigns: state.campaigns.filter((c) => c.id !== id),
    };
    wrtieToLocalStorage(newState);
    return newState;
  }),
  on(toggleCampaign, (state, { campaign, status }) => {
    const newState = {
      ...state,
      balance:
        status === 'on'
          ? state.balance - campaign.fundAmount
          : state.balance + campaign.fundAmount,
      campaigns: state.campaigns.map((c) =>
        c.id === campaign.id ? campaign : c
      ),
    };
    wrtieToLocalStorage(newState);
    return newState;
  }),
  on(init, (state) => {
    const storedState = readFromLocalStorage();
    return storedState ? storedState : state;
  })
);
