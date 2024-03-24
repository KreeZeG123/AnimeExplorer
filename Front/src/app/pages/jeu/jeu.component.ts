import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { JeuVictoireComponent } from '../../components/jeu-victoire/jeu-victoire.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SearchZoneComponent } from '../../components/search-zone/search-zone.component';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-jeu',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    SearchZoneComponent,
    JeuVictoireComponent,
  ],
  templateUrl: './jeu.component.html',
  styleUrl: './jeu.component.scss',
})
export class JeuComponent {
  constructor(private searchService: SearchService) {}

  public victoirePopUp: boolean = false;

  public historiqueAnime: any[] = [];

  addHistoriqueAnime(anime: any) {
    this.historiqueAnime.unshift(anime);
  }

  public animeSelectionne = { id: -1 };

  verifGuess(idx: number): void {
    this.animeSelectionne = this.searchService.getAnime(idx);
    this.addHistoriqueAnime(this.animeSelectionne);
    this.searchService.updateIndiceAnimeATrouver(this.animeSelectionne);
    if (this.animeSelectionne.id === this.searchService.getAnimeATrouver().id) {
      this.victoire();
    }
    console.log(
      'A trouver :',
      this.searchService.getAnimeATrouver().title.english,
      '\n',
      this.searchService.getAnimeATrouver().title.romaji
    );
  }

  victoire() {
    this.searchService.setAnimeVictoire(this.searchService.getAnimeATrouver());
    this.historiqueAnime = [];
    this.searchService.askAnimeATrouver();
    this.victoirePopUp = true;
  }

  public getIndices(): any {
    return this.searchService.getIndices();
  }

  public fermerPopUpVictoire(): void {
    this.victoirePopUp = false;
  }
}
