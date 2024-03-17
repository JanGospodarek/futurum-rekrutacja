import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InitialState } from 'src/app/store/campaigns.reducer';
import { Campaign } from 'src/app/types';
import { deleteCampaign, editCampaign } from 'src/app/store/campaigns.actions';
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
  isEditModalOpened = false;
  isKeywordModalOpened = false;
  constructor(private store: Store<{ campaigns: InitialState }>) {}
  ngOnInit(): void {
    this.editableCampaign = { ...this.campaign };
  }
  handleEdit(campaign: Campaign) {
    this.store.dispatch(editCampaign({ campaign }));
  }

  handleDelete() {
    const id = this.campaign.id;
    this.store.dispatch(deleteCampaign({ id }));
  }
  handleShowKeywords() {
    console.log(this.editableCampaign);
    console.log(this.campaign.keywords);
  }
}
