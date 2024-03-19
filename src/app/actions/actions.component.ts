import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Campaign, InitialState } from '../types';
import { Store } from '@ngrx/store';
import { addCampaign } from '../store/campaigns.actions';
@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css'],
})
export class ActionsComponent {
  isModalOpened = false;
  query = '';
  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  constructor(
    private store: Store<{
      campaigns: InitialState;
    }>
  ) {}
  handleAdd(campaign: Campaign) {
    this.store.dispatch(addCampaign({ campaign }));
    this.isModalOpened = false;
  }
  handleSearch(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.onSearch.emit(value);
  }
  handleClear() {
    this.query = '';
    this.onSearch.emit('');
  }
}
