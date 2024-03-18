import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InitialState } from './store/campaigns.reducer';
import { Observable } from 'rxjs';
import { init } from './store/campaigns.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'zadanie';
  campaigns$: Observable<InitialState>;
  query = '';

  constructor(
    private store: Store<{
      campaigns: InitialState;
    }>
  ) {
    this.campaigns$ = store.select('campaigns');
  }
  ngOnInit(): void {
    this.store.dispatch(init());
  }
  handleSearch(query: string) {
    this.query = query;
  }
}
