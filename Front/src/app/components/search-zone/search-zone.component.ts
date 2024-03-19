import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-search-zone',
  standalone: true,
  imports: [SearchBarComponent, CommonModule],
  templateUrl: './search-zone.component.html',
  styleUrl: './search-zone.component.scss',
})
export class SearchZoneComponent {
  animesResults = [
    { title: 'Naruto', year: 2002 },
    { title: 'Naruto Shippuden', year: 2007 },
    { title: 'Boruto', year: 2017 },
    { title: 'One Piece', year: 1999 },
    { title: 'Dragon Ball', year: 1986 },
    { title: 'Dragon Ball Z', year: 1989 },
    { title: 'Dragon Ball Super', year: 2015 },
    { title: 'Dragon Ball GT', year: 1996 },
  ];
}
