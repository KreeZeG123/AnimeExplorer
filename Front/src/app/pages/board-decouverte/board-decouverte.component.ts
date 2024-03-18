import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SearchComponent } from '../../components/search/search.component';
import { FiltreComponent } from '../../components/filtre/filtre.component';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';
import { VignetteComponent } from '../../components/vignette/vignette.component';
declare var require: any


@Component({
  selector: 'app-board-decouverte',
  standalone: true,
  imports: [NavBarComponent,SearchComponent,FiltreComponent,CommonModule,VignetteComponent],
  templateUrl: './board-decouverte.component.html',
  styleUrl: './board-decouverte.component.scss',
})
export class BoardDecouverteComponent{
  
  
  filtreGenre = ["Genre",["Action","Adventure","Drama","Fantasy","Mystery","Supernatural"],""]
  filtreAnnee = ["Annee",["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006","2005","2004","2003","2002","2001","2000","1999","1998","1997","1996","1995","1994","1993","1992","1991","1990","1989","1988","1987","1986","1985","1984","1983","1982","1981","1980","1979","1978","1977","1976","1975","1974","1973","1972","1971",],""]
  filtreFormat = ["Format",["TV","MOVIE"],""]
  
  vignettes : any []= []

  constructor(){}

  displayAnime() : Array<any> {
    const animeData = require("../../../assets/output.json");
    let listeAnime = [];
    let lenData = animeData.data.Page.media.length;
    for (let i = 0; i < lenData; i++) {
        let anime = [
            animeData.data.Page.media[i].title.english,
            animeData.data.Page.media[i].coverImage.large
        ];
        listeAnime.push(anime);
    }
    return listeAnime;
  }

  filtrerAnime(annee:string,format:string,genre:string) : Array<any> {
    const animeData = require("../../../assets/output.json");
    let listeAnime = [];
    let lenData = animeData.data.Page.media.length;
    for (let i = 0; i < lenData; i++) {
      if(animeData.data.Page.media[i].startDate.year==annee && animeData.data.Page.media[i].format==format){
        let lenGenre=animeData.data.Page.media[i].genres.length
        for(let j=0;j<lenGenre;j++){
          if(animeData.data.Page.media[i].genres[j]==genre){
            let anime = [
              animeData.data.Page.media[i].title.english,
              animeData.data.Page.media[i].coverImage.large
            ];
            listeAnime.push(anime);
          }
        }
          
          }
      }
      return listeAnime;
    }
    

  optionGenre: string=""
  optionAnnee: string=""
  optionFormat: string=""

  recupererOptionSelectionnee(optionSelectionnee: string, typeFiltre: string): void {
    if (typeFiltre === "FiltreGenre") {
      this.optionGenre = optionSelectionnee;
    } else if (typeFiltre === "FiltreAnnee") {
      this.optionAnnee = optionSelectionnee;
    } else if (typeFiltre === "FiltreFormat") {
      this.optionFormat = optionSelectionnee;
    }
  }

  appliquerFiltres():void {
    this.vignettes = this.filtrerAnime(this.optionAnnee,this.optionFormat,this.optionGenre);


  }


  ngOnInit(): void {
    this.vignettes = this.displayAnime();
  }
}
