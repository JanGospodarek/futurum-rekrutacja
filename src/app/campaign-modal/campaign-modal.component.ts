import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Observable, debounceTime, map } from 'rxjs';
import { Campaign, InitialState } from '../types';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

const companyBlueprint: Campaign = {
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
  @Input() campaign: Campaign = { ...companyBlueprint };

  keywordsUrl: string = '/assets/keywords.json';
  citiesUrl: string = '/assets/cities.json';

  bidControl = new FormControl(10, [
    Validators.required,
    Validators.min(10),
    Validators.max(100000),
  ]);
  fundControl = new FormControl(10, [Validators.required, Validators.min(10)]);
  radiusControl = new FormControl(10, [
    Validators.required,
    Validators.min(1),
    Validators.max(10000),
  ]);

  keywords: string[] = [];
  cities: string[] = [];
  campaigns$: Observable<InitialState>;
  campaignsNames: string[] = [];
  editableCampaign: Campaign = { ...this.campaign };
  errorMsg = '';
  currentKeyword = '';
  closingAnimation = false;
  balance = 0;

  constructor(
    private store: Store<{
      campaigns: InitialState;
    }>,
    private http: HttpClient
  ) {
    this.campaigns$ = store.select('campaigns');
  }

  ngOnInit(): void {
    this.http.get(this.keywordsUrl).subscribe((res) => {
      this.keywords = (res as { keywords: string[] }).keywords;
    });

    this.http.get(this.citiesUrl).subscribe((res) => {
      this.cities = (res as { cities: string[] }).cities;
    });

    this.campaigns$.subscribe((data) => {
      this.campaignsNames = data.campaigns.map((c) => c.name);
      this.balance = data.balance;
    });

    this.editableCampaign = { ...this.campaign };
  }

  handleClose() {
    this.closingAnimation = true;
    if (this.type === 'edit') this.editableCampaign = { ...this.campaign };
    else this.editableCampaign = { ...companyBlueprint };
    setTimeout(() => {
      this.closingAnimation = false;
      this.onClose.emit();
    }, 250);
  }

  handleSubmit() {
    const error = this.validate();
    if (error !== 'valid') {
      this.errorMsg = error;
      return;
    }

    this.onSubmit.emit(this.editableCampaign);
    this.editableCampaign = { ...companyBlueprint };
    this.errorMsg = '';
  }

  setKeyword(value: string) {
    this.currentKeyword = value.trim();
  }

  addKeyword() {
    if (
      this.currentKeyword === '' ||
      this.editableCampaign.keywords.includes(this.currentKeyword) ||
      this.currentKeyword.split(' ').length > 1
    ) {
      this.errorMsg = 'Invalid keyword';
      return;
    }

    if (this.editableCampaign.keywords.length > 30) {
      this.errorMsg = 'Max 30 keywords allowed';
      return;
    }

    this.editableCampaign.keywords = [
      ...this.editableCampaign.keywords,
      this.currentKeyword,
    ];

    this.currentKeyword = '';
    this.errorMsg = '';
  }

  removeKeyword(keyword: string) {
    this.editableCampaign.keywords = this.editableCampaign.keywords.filter(
      (item) => item !== keyword
    );
  }

  validate() {
    // Campaign name validation
    if (this.editableCampaign.name === '') return 'Fill campaign name field';

    if (
      (this.type === 'new' &&
        this.campaignsNames.includes(this.editableCampaign.name)) ||
      (this.type === 'edit' &&
        this.campaignsNames
          .filter((c) => c !== this.campaign.name)
          .includes(this.editableCampaign.name))
    )
      return 'Campaign with this name already exists';

    // Keywords validation
    if (this.editableCampaign.keywords.length === 0)
      return 'Please add at least one keyword';

    // Bid validation
    if (this.bidControl.errors) return 'Invalid bid value';

    // Fund validation
    const editBlanace = this.balance + this.campaign.fundAmount;
    if (
      this.fundControl.errors ||
      this.editableCampaign.fundAmount >= editBlanace ||
      (this.type === 'new' && this.editableCampaign.fundAmount > this.balance)
    )
      return 'Invalid fund value';

    // Radius validation
    if (this.radiusControl.errors) return 'Invalid radius value';

    return 'valid';
  }
}
