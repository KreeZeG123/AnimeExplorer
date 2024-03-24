import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BackEndService } from '../back-end/back-end.service';

interface httpPostResponse {
  message: string;
}

interface AnimeInfoResonse {
  id: string;
  title: {
    english: string;
    romaji: string;
  };
  episodes: string;
  studios: string[];
  genres: string[];
  tags: string[];
  startDate: string;
  season: string;
  format: string;
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
  popularity: string;
  meanScore: string;
  description: string;
  status: string;
  bannerImage: string;
}

interface AnimesListResponse extends httpPostResponse {
  animes: AnimeInfoResonse[];
}

interface AnimeATrouverResponse extends httpPostResponse {
  anime: AnimeInfoResonse;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private resultsAnimes: any = [];

  private topAnimesList: any = [];

  private animeATrouver: any = { id: -2 };

  private animeVictoire: any = {
    imageCover: { large: '' },
    title: { english: '', romaji: '' },
  };

  public indice: any = {
    startDate: '??',
    season: '??',
    format: '??',
    episodes: '??',
    studios: ['??'],
    genres: ['??'],
    tags: ['??'],
  };

  constructor(
    private httpClient: HttpClient,
    private backEndService: BackEndService
  ) {
    this.loadTopAnimesList().then((response) => {
      if (response == null) {
        console.error('Erreur lors du chargement de la liste des animes');
      } else if (response === 'already loaded') {
        console.log('Erreur : Liste des animes déjà chargée');
      }
    });
    this.askAnimeATrouver().then((response) => {
      if (response == null) {
        console.error("Erreur lors de l'obtention de l'anime à trouver");
      }
    });
  }

  private backEndServerURL: string = this.backEndService.getBackEndServerURL();

  async searchAnimeByName(nomAnime: string): Promise<any> {
    this.resultsAnimes = [];
    try {
      const response = await firstValueFrom(
        this.httpClient.post<AnimesListResponse>(
          this.backEndServerURL + 'searchAnimeByName',
          {
            name: nomAnime,
          }
        )
      );

      if (response && response.message === 'success') {
        this.resultsAnimes = response.animes;
        return 'success';
      } else {
        alert('Error occurred');
        return null;
      }
    } catch (error) {
      alert('Error occurred');
      console.error('Error occurred with', nomAnime, ':', error);
      return null;
    }
  }

  async searchAnimeByFilter(
    status: String,
    startDate: string,
    format: string,
    genres: string
  ) {
    this.resultsAnimes = [];
    try {
      const response = await firstValueFrom(
        this.httpClient.post<AnimesListResponse>(
          this.backEndServerURL + 'searchAnimeByFilter',
          {
            status: status,
            startDate: startDate,
            format: format,
            genres: genres,
          }
        )
      );
      if (response && response.message === 'success') {
        this.resultsAnimes = response.animes;
        return 'success';
      } else {
        alert('Error occurred');
        return null;
      }
    } catch (error) {
      alert('Error occurred');
      console.error(
        'Error occurred on searchAnimeByFilter(' + startDate,
        +',' + genres + +',' + format + +',' + status + '):',
        error
      );
      return null;
    }
  }

  searchResultToVignette(animes: any): any {
    let vignettes: any = [];
    for (let i = 0; i < animes.length; i++) {
      let title;
      if (
        animes[i].title.english != null &&
        animes[i].title.english != '' &&
        animes[i].title.english.trim() != '' &&
        animes[i].title.english != undefined
      ) {
        title = animes[i].title.english;
      } else {
        title = animes[i].title.romaji;
      }
      vignettes.push([title, animes[i].coverImage.large, animes[i].id]);
    }
    return vignettes;
  }

  async loadTopAnimesList(): Promise<any> {
    if (this.topAnimesList.length > 0) {
      return 'already loaded';
    }
    try {
      const response = await firstValueFrom(
        this.httpClient.get<AnimesListResponse>(
          this.backEndServerURL + 'getTopAnimesList'
        )
      );

      if (response && response.message === 'success') {
        this.topAnimesList = this.searchResultToVignette(response.animes);
        this.resultsAnimes = response.animes;
        return 'success';
      } else {
        alert('Error occurred');
        return 'error';
      }
    } catch (error) {
      alert('Error occurred');
      console.error('Error occurred with top animes list:', error);
      return 'error';
    }
  }

  async askAnimeATrouver(): Promise<any> {
    this.animeATrouver = {};
    try {
      const response = await firstValueFrom(
        this.httpClient.get<AnimeATrouverResponse>(
          this.backEndServerURL + 'askAnimeATrouver'
        )
      );

      if (response) {
        this.animeATrouver = response.anime;
        return 'succes';
      } else {
        alert('Error occurred');
        return null;
      }
    } catch (error) {
      alert('Error occurred');
      console.error('Error occurred with askAnimeATrouver() :', error);
      return null;
    }
  }

  detectMatchingElement(animATrouver: string[], animeGuess: string[]): any {
    let result = [];
    for (let i = 0; i < animATrouver.length; i++) {
      for (let j = 0; j < animeGuess.length; j++) {
        if (animATrouver[i] == animeGuess[j]) {
          if (
            animATrouver[i] != '' &&
            animATrouver[i] != undefined &&
            animATrouver[i] != null &&
            animATrouver[i].trim() != ''
          ) {
            result.push(animATrouver[i]);
          }
        }
      }
    }

    if (result.length == 0) {
      return ['??'];
    }
    return result;
  }

  compareAnimeInfo(animATrouver: any, animeGuess: any): any {
    let result: any = {
      startDate:
        animATrouver.startDate == animeGuess.startDate
          ? animATrouver.startDate
          : '??',
      season:
        animATrouver.season == animeGuess.season ? animATrouver.season : '??',
      format:
        animATrouver.format == animeGuess.format ? animATrouver.format : '??',
      episodes:
        animATrouver.episodes == animeGuess.episodes
          ? animATrouver.episodes
          : '??',
      studios: this.detectMatchingElement(
        animATrouver.studios,
        animeGuess.studios
      ),
      genres: this.detectMatchingElement(
        animATrouver.genres,
        animeGuess.genres
      ),
      tags: this.detectMatchingElement(animATrouver.tags, animeGuess.tags),
    };
    console.log('compareAnimeInfo :', result);
    return result;
  }

  // Concatène deux tableaux et enlève les doublons
  concatAnimeInfoTab(indice: any, indiceGuess: any): any {
    console.log('indice : \n', indice, 'indiceGuess : \n', indiceGuess);
    return Array.from(new Set(indice.concat(indiceGuess)));
  }

  // Filtre les informations de l'anime pour enlever les informations inutiles
  filterAnimeInfoTab(infoTab: any): any {
    // Si tableau vide ou contient que "??"
    for (let i = 0; i < infoTab.length; i++) {
      if (infoTab[i] != '??' && infoTab[i] != '') {
        return infoTab.filter((element: any) => {
          return (
            element != '??' &&
            element != '' &&
            element != undefined &&
            element != null &&
            element.trim() != ''
          );
        });
      }
    }
    return ['??'];
  }

  // Merges les informations entre indiexParam et this.indice
  mergeAnimeInfo(indiceCommunGues: any): any {
    let result: any = {
      // Informations uniques
      startDate:
        indiceCommunGues.startDate == '??'
          ? this.indice.startDate
          : indiceCommunGues.startDate,
      season:
        indiceCommunGues.season == '??'
          ? this.indice.season
          : indiceCommunGues.season,
      format:
        indiceCommunGues.format == '??'
          ? this.indice.format
          : indiceCommunGues.format,
      episodes:
        indiceCommunGues.episodes == '??'
          ? this.indice.episodes
          : indiceCommunGues.episodes,

      // Mérge les tableau et et enleve "??" si tableau vide non vide
      studios: this.filterAnimeInfoTab(
        this.concatAnimeInfoTab(this.indice.studios, indiceCommunGues.studios)
      ),
      genres: this.filterAnimeInfoTab(
        this.concatAnimeInfoTab(this.indice.genres, indiceCommunGues.genres)
      ),
      tags: this.filterAnimeInfoTab(
        this.concatAnimeInfoTab(this.indice.tags, indiceCommunGues.tags)
      ),
    };
    return result;
  }

  updateIndiceAnimeATrouver(animeGuess: any): any {
    this.indice = this.mergeAnimeInfo(
      this.compareAnimeInfo(this.animeATrouver, animeGuess)
    );
    console.log('updateIndiceAnimeATrouver :', this.indice);
  }

  getResultsAnimes() {
    return this.resultsAnimes;
  }

  getAnime(idx: number) {
    return this.resultsAnimes[idx];
  }

  resetResultsAnimes() {
    this.resultsAnimes = [];
  }

  getTopAnimesList(): any {
    return this.topAnimesList;
  }

  getAnimeATrouver(): any {
    return this.animeATrouver;
  }

  getIndices(): any {
    return this.indice;
  }

  setAnimeVictoire(anime: any) {
    this.animeVictoire = anime;
  }

  getAnimeVictoire(): any {
    return this.animeVictoire;
  }
}
