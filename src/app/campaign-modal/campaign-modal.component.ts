import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, debounceTime, map } from 'rxjs';
const keywords = ['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'];

@Component({
  selector: 'app-campaign-modal',
  templateUrl: './campaign-modal.component.html',
  styleUrls: ['./campaign-modal.component.css'],
})
export class CampaignModalComponent {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Input() isOpened = false;
  public model: any;
  cities = [
    'Warszawa',
    'Kraków',
    'Gdańsk',
    'Wrocław',
    'Poznań',
    'Szczecin',
    'Lublin',
  ];
  handleClose() {
    this.onClose.emit();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? []
          : keywords
              .filter(
                (name) => name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  formatter = (x: { name: string }) => x.name;
}
