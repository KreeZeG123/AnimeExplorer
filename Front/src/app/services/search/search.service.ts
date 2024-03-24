import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { BackEndService } from '../back-end/back-end.service';

interface httpPostResponse {
  message: string;
}

interface AnimeInfoResponse {
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
}

interface AnimesListResponse extends httpPostResponse {
  animes: AnimeInfoResponse[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public updatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private resultsAnimes: any = [];

  constructor(
    private httpClient: HttpClient,
    private backEndService: BackEndService
  ) {}

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

  getResultsAnimes() {
    return this.resultsAnimes;
  }

  getAnime(idx: number){
    return this.resultsAnimes[idx];
  }

  resetResultsAnimes() {
    this.resultsAnimes = [];
  }

  // Méthode pour indiquer que la mise à jour a eu lieu
  notifyUpdate(): void {
    console.log('notifyUpdate');
    console.log(this.resultsAnimes);
    this.updatedSubject.next(true);
  }

  // Méthode pour confirmer la mise à jour
  confirmUpdate(): void {
    console.log('confirmUpdate');
    this.updatedSubject.next(false);
  }

  // Méthode pour vérifier si la mise à jour a eu lieu (observable)
  isUpdated(): Observable<boolean> {
    return this.updatedSubject.asObservable();
  }
}
