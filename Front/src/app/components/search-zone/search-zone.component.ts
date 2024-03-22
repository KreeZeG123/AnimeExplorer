import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackEndService } from '../../services/back-end/back-end.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-search-zone',
  standalone: true,
  imports: [SearchBarComponent, CommonModule, FormsModule],
  templateUrl: './search-zone.component.html',
  styleUrl: './search-zone.component.scss',
})
export class SearchZoneComponent {
  search: string = '';

  resultsAnimes: any = [];

  constructor(private backEndService: BackEndService) {}

  async validateSearch() {
    this.resultsAnimes = [];
    await this.backEndService
      .searchAnimeByName(this.search)
      .then((response) => {
        if (response == null) {
          console.error('Erreur lors de la recherche');
        } else {
          this.resultsAnimes = response;
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion : ', error);
      });
  }
}
