import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private http: HttpClient) {}

  getImages(): Subject<string[]> {
    return this.http.get<string[]>('filtre.js');
  }
}
