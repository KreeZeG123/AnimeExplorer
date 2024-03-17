import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SearchComponent } from '../../components/search/search.component';
import { FiltreComponent } from '../../components/filtre/filtre.component';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-board-decouverte',
  standalone: true,
  imports: [NavBarComponent,SearchComponent,FiltreComponent,CommonModule],
  templateUrl: './board-decouverte.component.html',
  styleUrl: './board-decouverte.component.scss',
})
export class BoardDecouverteComponent{
  
  filtreGenre = ["Genre",["Action","Drame","Aventure","Comédie"],0]
  filtreAnnee = ["Annee",["2020","2021","2022","2023"],1]
  filtreFormat = ["Format",["TV","Movie"],2]
  

  images : string[]=[]
  constructor(private navigationService: NavigationService) { }
  
  ngOnInit(): void {
    this.images = this.navigationService.displayAnime();
  }
 
}
