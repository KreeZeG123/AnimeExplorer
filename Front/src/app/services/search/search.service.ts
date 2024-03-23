import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BackEndService } from '../back-end/back-end.service';

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
export class SearchService {
  constructor(
    private httpClient: HttpClient,
    private backEndService: BackEndService
  ) {}

  backEndServerURL: string = this.backEndService.getBackEndServerURL();

  async searchAnimeByName(nomAnime: string): Promise<any> {
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
        return response.animes;
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
}
