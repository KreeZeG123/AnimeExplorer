import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  search: string = "";

  @Output() searchChange = new EventEmitter<string>()

  onSearchSelectionneeChange() {
    this.searchChange.emit(this.search);
  }
}
