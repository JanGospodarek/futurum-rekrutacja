import { Component, Input } from '@angular/core';
import { Campaign } from 'src/app/types';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
})
export class CampaignComponent {
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

  openAccordion = false;
  isModalOpened = false;

  handleShowKeywords() {
    console.log(this.campaign.keywords);
  }
}
