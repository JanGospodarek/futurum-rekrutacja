import { createAction, props } from '@ngrx/store';
import { Campaign } from '../app/types';

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
export const toggleCampaign = createAction(
  ' Toggle Campaign',
  props<{ campaign: Campaign; status: 'on' | 'off' }>()
);

export const init = createAction('Init app');
