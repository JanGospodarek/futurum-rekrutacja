import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css'],
})
export class TypeaheadComponent {
  @Input() keywords: string[] = [];
  @Input() query = '';
  @Output() onSelectedQuery: EventEmitter<string> = new EventEmitter();
  isOpen = false;
  selectedKyewords: string[] = [];
  constructor() {
    this.selectedKyewords = this.keywords;
  }

  handleResultSelected(result: string) {
    this.query = result;
    this.onSelectedQuery.emit(result);
    this.isOpen = false;
  }

  handleQueryChange(event: Event) {
    this.query = (<HTMLInputElement>event.target).value.trim();
    if (this.query === '') {
      this.isOpen = false;
      return;
    }
    this.onSelectedQuery.emit(this.query);

    this.selectedKyewords = this.keywords.filter((keyword) =>
      keyword.includes(this.query)
    );
    if (this.selectedKyewords.length === 0) this.isOpen = false;
    else this.isOpen = true;
  }

  handleBlur() {
    setTimeout(() => {
      this.isOpen = false;
    }, 200);
  }
}
