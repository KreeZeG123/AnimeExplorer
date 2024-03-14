import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SearchComponent } from '../../components/search/search.component';
import { FiltreComponent } from '../../components/filtre/filtre.component';

@Component({
  selector: 'app-board-decouverte',
  standalone: true,
  imports: [NavBarComponent,SearchComponent,FiltreComponent],
  templateUrl: './board-decouverte.component.html',
  styleUrl: './board-decouverte.component.scss',
})
export class BoardDecouverteComponent {
  filtreGenre = ["Genre",["Action","Drame","Aventure","Comédie"],0]
  filtreAnnee = ["Annee",["2020","2021","2022","2023"],1]
  filtreFormat = ["Format",["TV","Movie"],2]
}
