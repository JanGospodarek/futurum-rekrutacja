import { createReducer, createSelector, on } from '@ngrx/store';
import { addCampaign, editCampaign, deleteCampaign } from './campaigns.actions';
import { Campaign } from '../types';

export interface InitialState {
  campaigns: Campaign[];
  number: number;
}
export const initialState: InitialState = {
  campaigns: [
    {
      id: '1',
      name: 'First campaign',
      fundAmount: 1000,
      bidAmount: 100,
      town: 'Warszawa',
      radius: 50,
      keywords: ['first', 'campaign'],
      status: 'on',
    },
    {
      id: '2',
      name: 'Second campaign',
      fundAmount: 1011100,
      bidAmount: 10330,
      town: 'Kraków',
      radius: 20,
      keywords: ['first', 'campaign'],
      status: 'on',
    },
  ],
  number: 123,
};
export const campaignsReducer = createReducer(
  initialState,
  on(addCampaign, (state, { campaign }) => ({
    ...state,
    campaigns: [...state.campaigns, campaign],
  })),
  on(editCampaign, (state, { campaign }) => ({
    ...state,
    campaigns: state.campaigns.map((c) =>
      c.id === campaign.id ? campaign : c
    ),
  })),
  on(deleteCampaign, (state, { id }) => ({
    ...state,
    campaigns: state.campaigns.filter((c) => c.id !== id),
  }))
);
