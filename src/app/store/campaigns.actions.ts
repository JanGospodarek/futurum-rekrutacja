import { createAction, props } from '@ngrx/store';
import { Campaign } from '../types';

export const addCampaign = createAction(
  ' Add Campaign',
  props<{ campaign: Campaign }>()
);

export const editCampaign = createAction(
  ' Edit Campaign',
  props<{ campaign: Campaign }>()
);

export const deleteCampaign = createAction(
  ' Delete Campaign',
  props<{ id: string }>()
);
