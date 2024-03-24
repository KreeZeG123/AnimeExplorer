import { Component, EventEmitter, Output } from '@angular/core';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-jeu-victoire',
  standalone: true,
  imports: [],
  templateUrl: './jeu-victoire.component.html',
  styleUrl: './jeu-victoire.component.scss',
})
export class JeuVictoireComponent {
  constructor(private searchService: SearchService) {}

  @Output() buttonClicked = new EventEmitter<void>();

  onClick(): void {
    this.buttonClicked.emit();
  }

  getAnime(): any {
    let anime = this.searchService.getAnimeVictoire();
    if (anime === undefined || anime === null || anime === '') {
      return { coverImage: { large: '' }, english: '', romaji: '' };
    } else {
      return anime;
    }
  }

  getImage(): string {
    return this.getAnime().coverImage.large || '';
  }

  getNom(): string {
    let title = this.getAnime().title;
    if (
      title.english === null ||
      title.english === '' ||
      title.english === undefined ||
      title.english.trim() === ''
    ) {
      return title.romaji || '';
    } else {
      return title.english || '';
    }
  }
}
