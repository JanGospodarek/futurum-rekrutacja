import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-campaign-keyword-modal',
  templateUrl: './campaign-keyword-modal.component.html',
  styleUrl: './campaign-keyword-modal.component.css',
})
export class CampaignKeywordModalComponent {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Input() isOpened = false;
  @Input() keywords: string[] = [];
  closingAnimation = false;
  handleClose() {
    this.closingAnimation = true;
    setTimeout(() => {
      this.closingAnimation = false;
      this.onClose.emit();
    }, 250);
  }
}
