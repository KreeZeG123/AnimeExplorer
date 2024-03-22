import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private baseUrl: string = 'http://localhost:3080/test';

  constructor(private http: HttpClient) {}

  // Exemple de méthode pour récupérer des données depuis l'URL
  getData(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Exemple de méthode pour envoyer des données vers l'URL
  sendData(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }
}
