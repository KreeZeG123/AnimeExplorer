import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  search: string = '';

  private debounceDelay: number = 500; // Délai de debounce en millisecondes
  private debounceTimeoutId: any; // Identifiant du délai de debounce

  constructor(private searchService: SearchService) {}

  @Output() newChange = new EventEmitter<boolean>();

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
      this.searchService.resetResultsAnimes();
      this.newChange.emit(false);
      return;
    }

    await this.searchService

      .searchAnimeByName(this.search)
      .then((response) => {
        if (response == null) {
          console.error('Erreur lors de la recherche');
        } else {
          this.newChange.emit(true);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion : ', error);
      });
  }

  getResultsAnimes() {
    return this.searchService.getResultsAnimes();
  }
}
