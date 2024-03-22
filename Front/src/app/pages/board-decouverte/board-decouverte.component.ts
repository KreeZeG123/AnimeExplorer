import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SearchComponent } from '../../components/search/search.component';
import { FiltreComponent } from '../../components/filtre/filtre.component';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';
import { VignetteComponent } from '../../components/vignette/vignette.component';
import { InfoAnimeComponent } from '../../components/info-anime/info-anime.component';
declare var require: any


@Component({
  selector: 'app-board-decouverte',
  standalone: true,
  imports: [NavBarComponent,SearchComponent,FiltreComponent,CommonModule,VignetteComponent,InfoAnimeComponent],
  templateUrl: './board-decouverte.component.html',
  styleUrl: './board-decouverte.component.scss',
})
export class BoardDecouverteComponent{
  
  
  filtreGenre = ["Genre",["Action","Adventure","Drama","Fantasy","Mystery","Supernatural"]]
  filtreAnnee = ["Annee",["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006","2005","2004","2003","2002","2001","2000","1999","1998","1997","1996","1995","1994","1993","1992","1991","1990","1989","1988","1987","1986","1985","1984","1983","1982","1981","1980","1979","1978","1977","1976","1975","1974","1973","1972","1971",]]
  filtreFormat = ["Format",["TV","MOVIE"]]
  filtreAiring = ["Airing Status",["FINISHED","RELEASING","NOT_YET_RELEASED","CANCELLED","HIATUS"]]
  
  vignettes : any []= []

  constructor(){}

  displayAnime() : Array<any> {
    const animeData = require("../../../assets/output.json");
    let listeAnime = [];
    let lenData = animeData.data.Page.media.length;
    for (let i = 0; i < lenData; i++) {
        let anime = [
            animeData.data.Page.media[i].title.english,
            animeData.data.Page.media[i].coverImage.large,
            animeData.data.Page.media[i].id,
        ];
        listeAnime.push(anime);
    }
    return listeAnime;
  }

  filtrerAnime(status : String,annee:string,format:string,genre:string) : Array<any> {
    const animeData = require("../../../assets/output.json");
    let listeAnime = [];
    let lenData = animeData.data.Page.media.length;
    for (let i = 0; i < lenData; i++) {
      if(((annee==="" || annee==="Any" )|| animeData.data.Page.media[i].startDate.year==annee) && ((format==="" || format==="Any" ) ||  animeData.data.Page.media[i].format==format) && ((status==="" || status==="Any" ) ||  animeData.data.Page.media[i].status==status)){
        if((genre==="" || genre==="Any") || animeData.data.Page.media[i].genres.includes(genre)){
            let anime = [
              animeData.data.Page.media[i].title.english,
              animeData.data.Page.media[i].coverImage.large,
              animeData.data.Page.media[i].id,
            ];
            listeAnime.push(anime);
          }
        }
          
      }
      return listeAnime;
    }

  chercherAnime(recherche:string) : Array<any> {
    const animeData = require("../../../assets/output.json");
    let listeAnime = [];
    let lenData = animeData.data.Page.media.length;
    for (let i = 0; i < lenData; i++) {
      console.log(animeData.data.Page.media[i].title.english);
      let animeTitle = animeData.data.Page.media[i].title
        if((animeTitle.english.toLowerCase().includes(recherche.toLowerCase()) || animeTitle.romaji.toLowerCase().includes(recherche.toLowerCase()))){
          let anime = [
            animeData.data.Page.media[i].title.english,
            animeData.data.Page.media[i].coverImage.large,
            animeData.data.Page.media[i].id,
          ];
          listeAnime.push(anime);
      }
    }
      
      return listeAnime;
    }

  optionGenre: string=""
  optionAnnee: string=""
  optionFormat: string=""
  optionAiring: string=""

  recupererOptionSelectionnee(optionSelectionnee: string, typeFiltre: string): void {
    if (typeFiltre === "FiltreGenre") {
      this.optionGenre = optionSelectionnee;
    } else if (typeFiltre === "FiltreAnnee") {
      this.optionAnnee = optionSelectionnee;
    } else if (typeFiltre === "FiltreFormat") {
      this.optionFormat = optionSelectionnee;
    } else if (typeFiltre === "FiltreAiring"){
      this.optionAiring = optionSelectionnee;
    }
  }

  appliquerFiltres():void {
    this.vignettes = this.filtrerAnime(this.optionAiring,this.optionAnnee,this.optionFormat,this.optionGenre);
  }

  input: string="";

  appliquerRecherche(input: string): void {
    this.input=input;
    this.vignettes = this.chercherAnime(input);
  }

  infoAnime: any[]=[];
  display: Boolean=false;

  displayInfo(id: number){
    const animeData = require("../../../assets/output.json");
    let lenData = animeData.data.Page.media.length;
    this.infoAnime=[];
    for (let i = 0; i < lenData; i++) {
      if(animeData.data.Page.media[i].id==id){
        this.infoAnime.push(animeData.data.Page.media[i].title.english);
        this.infoAnime.push(animeData.data.Page.media[i].title.romanji);
        this.infoAnime.push(animeData.data.Page.media[i].episodes);
        this.infoAnime.push(animeData.data.Page.media[i].description);
        this.infoAnime.push(animeData.data.Page.media[i].status);
      }
    }
    this.display=true;
  }

  handleButtonClick(){
    this.display=false;
  }

  ngOnInit(): void {
    this.vignettes = this.displayAnime();
  }
}
