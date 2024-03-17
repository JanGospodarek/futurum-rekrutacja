import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignComponent } from './campaign-list/campaign/campaign.component';
import { ActionsComponent } from './actions/actions.component';
import { CampaignModalComponent } from './campaign-modal/campaign-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeaheadComponent } from './campaign-modal/typeahead/typeahead.component';
import { StoreModule } from '@ngrx/store';
import { campaignsReducer } from './store/campaigns.reducer';
import { HttpClientModule } from '@angular/common/http';
import { CampaignKeywordModalComponent } from './campaign-list/campaign/campaign-keyword-modal/campaign-keyword-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CampaignListComponent,
    CampaignComponent,
    ActionsComponent,
    CampaignModalComponent,
    TypeaheadComponent,
    CampaignKeywordModalComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ campaigns: campaignsReducer }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
