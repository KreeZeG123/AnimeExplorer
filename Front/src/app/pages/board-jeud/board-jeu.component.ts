import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SearchZoneComponent } from '../../components/search-zone/search-zone.component';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-board-jeu',
  standalone: true,
  imports: [CommonModule, NavBarComponent, SearchZoneComponent],
  templateUrl: './board-jeu.component.html',
  styleUrl: './board-jeu.component.scss',
})
export class BoardJeuComponent {
  constructor(private searchService: SearchService) {}

  tag = [
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
  ];
  genre = [
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
  ];
  studio = [
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
    { name: '??' },
  ];

  animes = [
    {
      cover: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
      title: '??',
      synopsis: '??',
      studio: '??',
    },
    {
      cover: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
      title: '??',
      synopsis: '??',
      studio: '??',
    },
    {
      cover: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
      title: '??',
      synopsis: '??',
      studio: '??',
    },
  ];
}
