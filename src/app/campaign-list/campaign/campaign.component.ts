import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InitialState } from 'src/app/store/campaigns.reducer';
import { Campaign } from 'src/app/types';
import {
  deleteCampaign,
  editCampaign,
  toggleCampaign,
} from 'src/app/store/campaigns.actions';
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
  balance = 0;
  constructor(private store: Store<{ campaigns: InitialState }>) {
    this.store.select('campaigns').subscribe((state) => {
      this.balance = state.balance;
    });
  }
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
  handleToggle(event: Event) {
    if (
      this.editableCampaign.status === 'off' &&
      this.balance - this.editableCampaign.fundAmount < 0
    )
      return;

    const newStatus = this.editableCampaign.status === 'on' ? 'off' : 'on';
    this.editableCampaign.status = newStatus;
    this.store.dispatch(
      toggleCampaign({
        campaign: this.editableCampaign,
        status: newStatus,
      })
    );
  }
}
