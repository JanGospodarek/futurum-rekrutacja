import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Observable, debounceTime, map } from 'rxjs';
import { Campaign, City } from '../types';
import { Store } from '@ngrx/store';
import { InitialState } from '../store/campaigns.reducer';
import { HttpClient } from '@angular/common/http';

const keywords = ['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'];

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
export class CampaignModalComponent implements OnInit {
  @Output() onClose: EventEmitter<Campaign> = new EventEmitter();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Input() isOpened = false;
  @Input() type: 'new' | 'edit' = 'new';
  @Input() campaign: Campaign = { ...companyMock };

  url: string = '/assets/keywords.json';

  keywords: string[] = keywords;
  cities: string[] = [];
  currentKeyword = '';
  campaigns$: Observable<InitialState>;
  campaignsNames: string[] = [];
  editableCampaign: Campaign = { ...this.campaign };
  errorMsg = '';
  closingAnimation = false;

  constructor(
    private store: Store<{
      campaigns: InitialState;
    }>,
    private http: HttpClient
  ) {
    this.campaigns$ = store.select('campaigns');
  }
  ngOnInit(): void {
    this.http.get(this.url).subscribe((res) => {
      this.keywords = (res as { keywords: string[] }).keywords;
    });
    this.campaigns$.subscribe((data) => {
      this.campaignsNames = data.campaigns.map((c) => c.name);
    });
    this.editableCampaign = { ...this.campaign };
  }
  handleClose() {
    this.closingAnimation = true;
    setTimeout(() => {
      this.closingAnimation = false;
      this.onClose.emit();
    }, 300);
  }
  handleSubmit() {
    if (
      (this.type === 'new' &&
        this.campaignsNames.includes(this.editableCampaign.name)) ||
      (this.type === 'edit' &&
        this.campaignsNames
          .filter((c) => c !== this.campaign.name)
          .includes(this.editableCampaign.name))
    ) {
      this.errorMsg = 'Campaign with this name already exists';
      return;
    }

    if (this.editableCampaign.keywords.length === 0) {
      this.errorMsg = 'Please add at least one keyword';
      return;
    }

    this.onSubmit.emit(this.editableCampaign);
    this.editableCampaign = { ...companyMock };
    this.errorMsg = '';
  }

  setKeyword(value: string) {
    this.currentKeyword = value.trim();
  }

  addKeyword() {
    if (
      this.currentKeyword === '' ||
      this.editableCampaign.keywords.includes(this.currentKeyword) ||
      this.editableCampaign.keywords.length > 15
    )
      return;

    this.editableCampaign.keywords = [
      ...this.editableCampaign.keywords,
      this.currentKeyword,
    ];
    this.currentKeyword = '';
  }

  removeKeyword(keyword: string) {
    this.editableCampaign.keywords = this.editableCampaign.keywords.filter(
      (item) => item !== keyword
    );
  }
  handleSetTown(event: Event) {
    this.editableCampaign.town = (<HTMLInputElement>event.target).value as City;
  }
  handleCampaignNameChange(event: Event) {
    const name = (<HTMLInputElement>event.target).value.trim();
    this.editableCampaign.name = name;
  }
}
