import { Component, OnInit } from '@angular/core';
import { Campaign } from '../types';
import { Observable } from 'rxjs';
// import { InitialState } from '../store/campaigns.reducer';
// import { selectCampaigns } from '../store/campaigns.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
})
export class CampaignListComponent implements OnInit {
  // campaigns$: Observable<number>;

  // constructor(
  //   private store: Store<{
  //     campaigns: number;
  //   }>
  // ) {
  //   this.campaigns$ = store.select('campaigns');

  //   console.log(this.campaigns$);
  // }
  count$: Observable<number>;

  constructor(private store: Store<{ campaigns: number }>) {
    this.count$ = store.select('campaigns');
  }
  ngOnInit(): void {
    // this.campaigns = this.store.select('campaigns');
  }
}
