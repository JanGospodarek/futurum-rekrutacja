import { Component, Input, OnChanges } from '@angular/core';
import { Campaign, InitialState } from '../types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFilteredCampaigns } from '../../store/campaigns.selector';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
})
export class CampaignListComponent implements OnChanges {
  campaigns$!: Observable<Campaign[]>;
  @Input() query: string = '';
  constructor(
    private store: Store<{
      campaigns: InitialState;
    }>
  ) {}

  ngOnChanges(): void {
    this.campaigns$ = this.store.select(selectFilteredCampaigns, {
      query: this.query,
    });
  }
}
