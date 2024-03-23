import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search/search.service';
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

  username: string = 'default';

  private debounceDelay: number = 500; // Délai de debounce en millisecondes
  private debounceTimeoutId: any; // Identifiant du délai de debounce

  constructor(private searchService: SearchService) {}

  onSearchChange() {
    // Si un délai de debounce est en cours, annuler le délai
    if (this.debounceTimeoutId) {
      clearTimeout(this.debounceTimeoutId);
    }

    // Définir un nouveau délai de debounce
    this.debounceTimeoutId = setTimeout(() => {
      // Appeler la fonction de recherche
      this.validateSearch();
    }, this.debounceDelay);
  }

  async validateSearch() {
    if (this.search === '' || this.search.trim() == '') {
      this.resultsAnimes = [];
      return;
    }

    this.resultsAnimes = [];
    await this.searchService
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
