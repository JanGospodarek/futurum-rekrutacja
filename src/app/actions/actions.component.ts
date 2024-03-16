import { Component } from '@angular/core';
import { Campaign } from '../types';
import { Store } from '@ngrx/store';
import { InitialState } from '../store/campaigns.reducer';
import { addCampaign } from '../store/campaigns.actions';
@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css'],
})
export class ActionsComponent {
  isModalOpened = false;
  constructor(
    private store: Store<{
      campaigns: InitialState;
    }>
  ) {}
  handleAdd(campaign: Campaign) {
    this.store.dispatch(addCampaign({ campaign }));
    this.isModalOpened = false;
  }
}
