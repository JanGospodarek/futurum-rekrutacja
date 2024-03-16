import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InitialState } from 'src/app/store/campaigns.reducer';
import { Campaign } from 'src/app/types';
import { editCampaign } from 'src/app/store/campaigns.actions';
@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
})
export class CampaignComponent implements OnInit {
  @Input() campaign: Campaign = {
    id: '123',
    name: 'Campaign 1',
    keywords: [],
    bidAmount: 10,
    fundAmount: 10,
    status: 'on',
    town: 'Warszawa',
    radius: 10,
  };
  editableCampaign = { ...this.campaign };

  openAccordion = false;
  isModalOpened = false;
  constructor(private store: Store<{ campaigns: InitialState }>) {}
  ngOnInit(): void {
    this.editableCampaign = { ...this.campaign };
  }
  handleEdit(campaign: Campaign) {
    console.log(campaign);
    this.store.dispatch(editCampaign({ campaign }));
  }
  handleShowKeywords() {
    console.log(this.editableCampaign);
    console.log(this.campaign.keywords);
  }
}
