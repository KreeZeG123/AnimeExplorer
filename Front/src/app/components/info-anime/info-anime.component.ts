import { Component, Input, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-anime',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-anime.component.html',
  styleUrl: './info-anime.component.scss'
})
export class InfoAnimeComponent {
  @Input() info: any;

  
  nom_english: String="";
  nom_jap: String="";
  episodes: number=0;
  desc: String="";
  status: String="";


  
  ngOnInit(): void {
    this.nom_english = this.info[0];
    this.nom_jap = this.info[1];
    this.episodes= this.info[2];
    this.desc=this.info[3].replaceAll("<br>",'\n');
    this.status=this.info[4];
  }

  @Output() buttonClicked = new EventEmitter<void>();

  onClick(): void {
    this.buttonClicked.emit();
  }

 
}
