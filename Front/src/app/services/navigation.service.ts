import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
// @ts-ignore
import { displayAnime } from './filtre.js';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {

  constructor(){}

  displayAnime(): string[] {
    return displayAnime();
  }

}
