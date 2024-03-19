import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SearchZoneComponent } from '../../components/search-zone/search-zone.component';

@Component({
  selector: 'app-board-jeu',
  standalone: true,
  imports: [NavBarComponent, SearchZoneComponent],
  templateUrl: './board-jeu.component.html',
  styleUrl: './board-jeu.component.scss',
})
export class BoardJeuComponent {}
