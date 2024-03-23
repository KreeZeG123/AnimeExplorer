import { Injectable } from '@angular/core';

interface httpPostResponse {
  message: string;
}

interface AnimeInfoResonse extends httpPostResponse {
  id: string;
  title: string[];
  episodes: string;
  studio: string[];
  genres: string[];
  tags: string[];
  startDate: string;
  season: string;
  format: string;
  image: string;
  poupularity: string;
  score: string;
  description: string;
}

interface AnimesListResponse extends httpPostResponse {
  animes: AnimeInfoResonse[];
}

@Injectable({
  providedIn: 'root',
})
export class BackEndService {
  // URL du serveur back end
  private backEndServerURL: string = 'http://localhost:3080/';

  // Obtenir l'url du serveur back end
  public getBackEndServerURL(): string {
    return this.backEndServerURL;
  }
}
