import { createSelector } from '@ngrx/store';
import { InitialState } from './campaigns.reducer';
import { Campaign } from '../types';
// import { Campaign } from '../types';

export const selectFilteredCampaigns = createSelector(
  (state: { campaigns: InitialState }) => state.campaigns,
  (state: InitialState, props: { query: string }) =>
    state.campaigns.filter((c: Campaign) => c.name.includes(props.query))
);
