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

  public vignettes: any[] = [];

  constructor(private searchService: SearchService) {}

  displayAnime(): Array<any> {
    const animeData = require('../../../assets/output.json');
    let listeAnime = [];
    let lenData = animeData.data.Page.media.length;
    for (let i = 0; i < lenData; i++) {
      let anime = [
        animeData.data.Page.media[i].title.english,
        animeData.data.Page.media[i].coverImage.large,
        animeData.data.Page.media[i].id,
      ];
      listeAnime.push(anime);
    }
    return listeAnime;
  }

  filtrerAnime(
    status: String,
    annee: string,
    format: string,
    genre: string
  ): Array<any> {
    const animeData = require('../../../assets/output.json');
    let listeAnime = [];
    let lenData = animeData.data.Page.media.length;
    for (let i = 0; i < lenData; i++) {
      if (
        (annee === '' ||
          annee === 'Any' ||
          animeData.data.Page.media[i].startDate.year == annee) &&
        (format === '' ||
          format === 'Any' ||
          animeData.data.Page.media[i].format == format) &&
        (status === '' ||
          status === 'Any' ||
          animeData.data.Page.media[i].status == status)
      ) {
        if (
          genre === '' ||
          genre === 'Any' ||
          animeData.data.Page.media[i].genres.includes(genre)
        ) {
          let anime = [
            animeData.data.Page.media[i].title.english,
            animeData.data.Page.media[i].coverImage.large,
            animeData.data.Page.media[i].id,
          ];
          listeAnime.push(anime);
        }
      }
    }
    return listeAnime;
  }

  chercherAnime(recherche: string): Array<any> {
    const animeData = require('../../../assets/output.json');
    let listeAnime = [];
    let lenData = animeData.data.Page.media.length;
    for (let i = 0; i < lenData; i++) {
      let animeTitle = animeData.data.Page.media[i].title;
      if (
        animeTitle.english.toLowerCase().includes(recherche.toLowerCase()) ||
        animeTitle.romaji.toLowerCase().includes(recherche.toLowerCase())
      ) {
        let anime = [
          animeData.data.Page.media[i].title.english,
          animeData.data.Page.media[i].coverImage.large,
          animeData.data.Page.media[i].id,
        ];
        listeAnime.push(anime);
      }
    }

    return listeAnime;
  }

  optionGenre: string = '';
  optionAnnee: string = '';
  optionFormat: string = '';
  optionAiring: string = '';

  recupererOptionSelectionnee(
    optionSelectionnee: string,
    typeFiltre: string
  ): void {
    if (typeFiltre === 'FiltreGenre') {
      if (optionSelectionnee === 'Any' || optionSelectionnee === '') {
        this.optionGenre = optionSelectionnee;
      } else {
        for (let i = 0; i < this.filtreGenre[1].length; i++) {
          if (this.filtreGenre[1][i] == optionSelectionnee) {
            this.optionGenre = this.filtreGenre[2][i];
          }
        }
      }
    } else if (typeFiltre === 'FiltreAnnee') {
      this.optionAnnee = optionSelectionnee;
    } else if (typeFiltre === 'FiltreFormat') {
      if (optionSelectionnee === 'Any' || optionSelectionnee === '') {
        this.optionFormat = optionSelectionnee;
      } else {
        for (let i = 0; i < this.filtreFormat[1].length; i++) {
          if (this.filtreFormat[1][i] == optionSelectionnee) {
            this.optionFormat = this.filtreFormat[2][i];
          }
        }
      }
    } else if (typeFiltre === 'FiltreAiring') {
      if (optionSelectionnee === 'Any' || optionSelectionnee === '') {
        this.optionAiring = optionSelectionnee;
      } else {
        for (let i = 0; i < this.filtreAiring[1].length; i++) {
          if (this.filtreAiring[1][i] == optionSelectionnee) {
            this.optionAiring = this.filtreAiring[2][i];
          }
        }
      }
    }
  }

  appliquerFiltres(): void {
    this.vignettes = this.filtrerAnime(
      this.optionAiring,
      this.optionAnnee,
      this.optionFormat,
      this.optionGenre
    );
  }

  input: string = '';

  appliquerRecherche(input: string): void {
    this.input = input;
    this.vignettes = this.chercherAnime(input);
  }

  infoAnime: any[] = [];
  display: Boolean = false;

  displayInfo(id: number) {
    const animeData = require('../../../assets/output.json');
    let lenData = animeData.data.Page.media.length;
    this.infoAnime = [];
    for (var i = 0; i < lenData; i++) {
      if (animeData.data.Page.media[i].id == id) {
        this.infoAnime.push(animeData.data.Page.media[i].title.english);
        this.infoAnime.push(animeData.data.Page.media[i].title.romanji);
        this.infoAnime.push(animeData.data.Page.media[i].episodes);
        this.infoAnime.push(animeData.data.Page.media[i].description);
        this.infoAnime.push(animeData.data.Page.media[i].status);
        this.infoAnime.push(animeData.data.Page.media[i].coverImage.large);
        this.infoAnime.push(animeData.data.Page.media[i].bannerImage);
        this.infoAnime.push(animeData.data.Page.media[i].meanScore);
        let lenStudios = animeData.data.Page.media[i].studios.nodes.length;
        let tabStudios = [];
        for (let j = 0; j < lenStudios; j++) {
          tabStudios.push(animeData.data.Page.media[i].studios.nodes[j].name);
        }
        this.infoAnime.push(tabStudios);
        this.infoAnime.push(animeData.data.Page.media[i].genres);
        this.infoAnime.push(animeData.data.Page.media[i].startDate.year);
        let lenTags = animeData.data.Page.media[i].tags.length;
        let tabTags = [];
        for (let j = 0; j < lenTags; j++) {
          tabTags.push(animeData.data.Page.media[i].tags[j].name);
        }
        this.infoAnime.push(tabTags);
      }
    }
    this.display = true;
  }

  handleButtonClick() {
    this.display = false;
  }

  ngOnInit(): void {
    this.vignettes = this.displayAnime();
  }

  updateVignettes(etatUpdate: boolean): any {
    console.log('updateVignettes');
    if (etatUpdate) {
      this.vignettes = [];
      let result = this.searchService.getResultsAnimes();
      for (let i = 0; i < result.length; i++) {
        this.vignettes.push([
          result[i].title.english,
          result[i].coverImage.large,
          result[i].id,
        ]);
      }
    } else {
      this.vignettes = this.displayAnime();
    }
  }
}
