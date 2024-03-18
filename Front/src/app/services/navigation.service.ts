import { Injectable } from '@angular/core';
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
