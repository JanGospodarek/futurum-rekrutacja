import { Component } from '@angular/core';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
})
export class CampaignComponent {
  name = 'Campaign 1';
  description = 'This is a description of the campaign';
  keywords = ['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'];
  openAccordion = false;
  handleShowKeywords() {
    console.log(this.keywords);
  }
}
