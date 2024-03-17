import { Component, OnInit } from '@angular/core';
import { Campaign } from '../types';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { InitialState } from '../store/campaigns.reducer';
import { init } from '../store/campaigns.actions';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
})
export class CampaignListComponent {
  campaigns$: Observable<InitialState>;

  constructor(
    private store: Store<{
      campaigns: InitialState;
    }>
  ) {
    this.campaigns$ = store.select('campaigns');
  }
}
