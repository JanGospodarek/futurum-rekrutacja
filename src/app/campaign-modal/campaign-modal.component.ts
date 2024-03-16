import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Observable, debounceTime, map } from 'rxjs';
import { Campaign, City } from '../types';
const keywords = ['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'];

const cities: City[] = [
  'Warszawa',
  'Kraków',
  'Gdańsk',
  'Wrocław',
  'Poznań',
  'Szczecin',
  'Lublin',
];
const companyMock: Campaign = {
  id: '',
  name: '',
  keywords: [],
  bidAmount: 10,
  fundAmount: 10,
  status: 'on',
  town: 'Warszawa',
  radius: 10,
};

@Component({
  selector: 'app-campaign-modal',
  templateUrl: './campaign-modal.component.html',
  styleUrls: ['./campaign-modal.component.css'],
})
export class CampaignModalComponent {
  @Output() onClose: EventEmitter<Campaign> = new EventEmitter();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Input() isOpened = false;
  @Input() type: 'new' | 'edit' = 'new';

  @Input() campaign: Campaign = { ...companyMock };

  keywords: string[] = keywords;
  cities: string[] = cities;
  currentKeyword = '';

  handleClose() {
    this.onClose.emit();
  }
  handleSubmit() {
    this.onSubmit.emit(this.campaign);
    this.campaign = { ...companyMock };
  }

  setKeyword(value: string) {
    this.currentKeyword = value.trim();
  }

  addKeyword() {
    if (
      this.currentKeyword === '' ||
      this.campaign.keywords.includes(this.currentKeyword)
    )
      return;

    this.campaign.keywords = [...this.campaign.keywords, this.currentKeyword];
    this.currentKeyword = '';
  }

  removeKeyword(keyword: string) {
    this.campaign.keywords = this.campaign.keywords.filter(
      (item) => item !== keyword
    );
  }
  handleSetTown(event: Event) {
    this.campaign.town = (<HTMLInputElement>event.target).value as City;
  }
}
