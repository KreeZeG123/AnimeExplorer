import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FiltreComponent } from '../../components/filtre/filtre.component';
import { InfoAnimeComponent } from '../../components/info-anime/info-anime.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { VignetteComponent } from '../../components/vignette/vignette.component';
import { SearchService } from '../../services/search/search.service';
declare var require: any;

@Component({
  selector: 'app-decouvrir',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    SearchBarComponent,
    FiltreComponent,
    VignetteComponent,
    InfoAnimeComponent,
  ],
  templateUrl: './decouvrir.component.html',
  styleUrl: './decouvrir.component.scss',
})
export class DecouvrirComponent {
  @ViewChild('childComponent') childComponent!: SearchBarComponent;

  // Les options des filtres
  public filtreGenre = [
    'Genre',
    ['Action', 'Aventure', 'Drame', 'Fantaisie', 'Mystère', 'Supernaturel'],
    ['Action', 'Adventure', 'Drama', 'Fantasy', 'Mystery', 'Supernatural'],
  ];
  public filtreAnnee: any = [
    'Annee',
    Array.from({ length: 2024 - 1971 + 1 }, (_, index) =>
      (2024 - index).toString()
    ),
  ];
  public filtreFormat = ['Format', ['TV', 'Film'], ['TV', 'MOVIE']];
  public filtreAiring = [
    'Statut de diffusion',
    ['Terminé', 'En diffusion', 'Pas encore sorti', 'Annulé', 'Abandonné'],
    ['FINISHED', 'RELEASING', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS'],
  ];

  // Les vignettes affichées sur la page
  public vignettes: any[] = [];

  // Les options selectionnées des filtres
  optionGenre: string = '';
  optionAnnee: string = '';
  optionFormat: string = '';
  optionAiring: string = '';

  // Les informations d'un anime
  infoAnime: any[] = [];

  // Affichage de la fenêtre d'information
  display: Boolean = false;

  constructor(private searchService: SearchService) {}

  // Fonction pour modifier l'option d'un filtre
  public modifierOptionFiltre(filtre: string, option: string) {
    switch (filtre) {
      case 'FiltreGenre':
        this.optionGenre = option;
        break;
      case 'FiltreFormat':
        this.optionFormat = option;
        break;
      case 'FiltreAiring':
        this.optionAiring = option;
        break;
      default:
    }
  }

  // Fonction pour récupérer l'option selectionnée dans un filtre
  recupererOptionSelectionnee(
    optionSelectionnee: string,
    typeFiltre: string
  ): void {
    if (optionSelectionnee == 'Any') {
    }
    // Si filtre année, on change l'option année en l'options selectionnée
    if (typeFiltre === 'FiltreAnnee') {
      this.optionAnnee = optionSelectionnee;
      return;
    }
    // Création d'un dictionnaire pour simplifier la gestion des filtres
    let dict: any = {
      FiltreGenre: this.filtreGenre,
      FiltreFormat: this.filtreFormat,
      FiltreAiring: this.filtreAiring,
    };

    // Si l'option selectionnée est 'Any' ou vide, on change l'option du filtre en 'Any'
    if (optionSelectionnee == 'Any' || optionSelectionnee == '') {
      this.modifierOptionFiltre(typeFiltre, optionSelectionnee);
    } else {
      // Sinon, on cherche l'index de l'option selectionnée dans le filtre
      for (let i = 0; i < dict[typeFiltre][1].length; i++) {
        // On change l'option du filtre en l'option selectionnée dans le format correspondante
        if (dict[typeFiltre][1][i] == optionSelectionnee) {
          this.modifierOptionFiltre(typeFiltre, dict[typeFiltre][2][i]);
        }
      }
    }
  }

  // Fonction pour rechercher les animes par filtre
  async searchAnimeByFilter(
    status: String,
    startDate: string,
    format: string,
    genres: string
  ) {
    await this.searchService.searchAnimeByFilter(
      status,
      startDate,
      format,
      genres
    );
    this.vignettes = this.searchService.searchResultToVignette(
      this.searchService.getResultsAnimes()
    );
  }

  // Fonction pour détecter si un filtre est vide
  detectionFiltreVide(filtre: string) {
    if (filtre == '' || filtre == 'Any') {
      return true;
    } else {
      return false;
    }
  }

  // Fonction pour détecter si tous les filtres sont vides
  detectionFiltresVide(): boolean {
    if (
      this.detectionFiltreVide(this.optionAiring) &&
      this.detectionFiltreVide(this.optionAnnee) &&
      this.detectionFiltreVide(this.optionFormat) &&
      this.detectionFiltreVide(this.optionGenre)
    ) {
      return true;
    } else {
      return false;
    }
  }

  afficherDefaultAnimes() {
    this.vignettes = this.searchService.getTopAnimesList();
  }

  // Fonction pour appliquer les filtres et lancer la recherche d'animes
  appliquerFiltres(): void {
    if (!this.detectionFiltresVide()) {
      this.searchAnimeByFilter(
        this.optionAiring,
        this.optionAnnee,
        this.optionFormat,
        this.optionGenre
      );
    }
    if (this.vignettes.length == 0) {
      this.vignettes = this.searchService.getTopAnimesList();
    }
  }

  displayInfo(idx: number) {
    let animeData = this.searchService.getResultsAnimes();

    this.infoAnime = [];
    this.infoAnime.push(animeData[idx].title.english || 'N/A');
    this.infoAnime.push(animeData[idx].title.romaji || 'N/A');
    this.infoAnime.push(animeData[idx].episodes || 'N/A');
    this.infoAnime.push(animeData[idx].studios || 'N/A');
    this.infoAnime.push(animeData[idx].genres || 'N/A');
    this.infoAnime.push(animeData[idx].tags || 'N/A');
    this.infoAnime.push(animeData[idx].startDate || 'N/A');
    this.infoAnime.push(animeData[idx].season || 'N/A');
    this.infoAnime.push(animeData[idx].format || 'N/A');
    this.infoAnime.push(animeData[idx].coverImage.large || 'N/A');
    this.infoAnime.push(animeData[idx].meanScore || 'N/A');
    let description = animeData[idx].description || 'N/A';
    this.infoAnime.push(description.replace('<br>', '').replace('<i>', ''));
    this.infoAnime.push(animeData[idx].status || 'N/A');
    this.infoAnime.push(animeData[idx].bannerImage || 'N/A');

    this.display = true;
  }

  handleButtonClick() {
    this.display = false;
  }

  getTopAnimesList(): any {
    this.vignettes = this.searchService.getTopAnimesList();
  }

  updateVignettes(etatUpdate: boolean): any {
    if (etatUpdate) {
      this.vignettes = this.searchService.searchResultToVignette(
        this.searchService.getResultsAnimes()
      );
    } else {
      this.vignettes = this.searchService.getTopAnimesList();
    }
  }

  ngOnInit(): void {
    let result = this.searchService.getTopAnimesList();
    if (result.length == 0) {
      let interval = setInterval(() => {
        result = this.searchService.getTopAnimesList();
        if (result.length != 0) {
          this.vignettes = result;
          clearInterval(interval);
        }
      }, 150);
    } else {
      this.vignettes = result;
    }
  }
}
