import { createSelector } from '@ngrx/store';
import { InitialState } from './campaigns.reducer';
import { Campaign } from '../types';

export const selectCampaigns = (state: InitialState) => state.campaigns;
export const selectCampaignsState = createSelector(
  selectCampaigns,
  (state: Campaign[]) => state
);
