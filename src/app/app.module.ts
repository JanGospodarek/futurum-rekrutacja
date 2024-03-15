import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignComponent } from './campaign-list/campaign/campaign.component';
import { ActionsComponent } from './actions/actions.component';
import { AddCampaignModalComponent } from './actions/add-campaign-modal/add-campaign-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CampaignListComponent,
    CampaignComponent,
    ActionsComponent,
    AddCampaignModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
