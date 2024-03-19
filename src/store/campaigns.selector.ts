import { createSelector } from '@ngrx/store';
import { InitialState, Campaign } from '../app/types';

export const selectFilteredCampaigns = createSelector(
  (state: { campaigns: InitialState }) => state.campaigns,
  (state: InitialState, props: { query: string }) =>
    state.campaigns.filter((c: Campaign) => c.name.includes(props.query))
);
