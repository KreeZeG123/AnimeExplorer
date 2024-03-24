import { Injectable } from '@angular/core';

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
