import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BackEndService } from '../back-end/back-end.service';

interface httpPostResponse {
  message: string;
}

interface personalRankingResponse {
  point: string;
  ranking: string;
}

interface rankingInfoResponse {
  name: string;
  point: string;
}

interface rankingResponse extends httpPostResponse {
  personalRanking: personalRankingResponse;
  ranking: rankingInfoResponse[];
}

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  constructor(
    private backEndService: BackEndService,
    private httpClient: HttpClient
  ) {}

  private backEndServerURL: string = this.backEndService.getBackEndServerURL();

  async getRanking(userID: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpClient.post<rankingResponse>(
          this.backEndServerURL + 'ranking',
          {
            userID: userID,
          }
        )
      );

      if (response && response.message === 'success') {
        return response;
      } else {
        alert('Error occurred');
        return null;
      }
    } catch (error) {
      alert('Error occurred');
      console.error(
        'Error occurred with RankingService.getRanking(',
        userID,
        ') : ',
        error
      );
      return null;
    }
  }
}
