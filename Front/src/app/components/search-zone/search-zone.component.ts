import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
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
      this.searchService.resetResultsAnimes();
      return;
    }
    await this.searchService
      .searchAnimeByName(this.search)
      .then((response) => {
        if (response == null) {
          console.error('Erreur lors de la recherche');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion : ', error);
      });
  }

  getResultsAnimes() {
    return this.searchService.getResultsAnimes();
  }

  @Output() buttonClicked = new EventEmitter<number>();

  confirmGuess(idx: number): void {
    this.search = '';
    this.buttonClicked.emit(idx);
  }

  checkNameIsUndefined(title: string): boolean {
    if (title == null || title == '' || title == undefined) {
      return true;
    }
    return false;
  }

  checkAnimeName(anime: any): number {
    if (this.checkNameIsUndefined(anime.title.english)) {
      return -1;
    }
    if (this.checkNameIsUndefined(anime.title.romaji)) {
      return 1;
    }
    return 0;
  }
}
