import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { ListeAnimeComponent } from '../liste-anime/liste-anime.component';
import { FiltreComponent } from '../filtre/filtre.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SearchComponent,ListeAnimeComponent,FiltreComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  genre = "Genre";
  annee= "Année"
}
