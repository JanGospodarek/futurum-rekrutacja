import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignComponent } from './campaign-list/campaign/campaign.component';
import { ActionsComponent } from './actions/actions.component';
import { CampaignModalComponent } from './campaign-modal/campaign-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CampaignListComponent,
    CampaignComponent,
    ActionsComponent,
    CampaignModalComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
