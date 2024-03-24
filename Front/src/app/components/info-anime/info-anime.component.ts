import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info-anime',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-anime.component.html',
  styleUrl: './info-anime.component.scss',
})
export class InfoAnimeComponent {
  @Input() info: any;

  nom_english: String = '';
  nom_jap: String = '';
  episodes: number = 0;
  studios: string[] = [];
  genres: string[] = [];
  tags: string[] = [];
  annee: number = 0;
  season: string = '';
  format: string = '';
  image: string = '';
  score: string = ' ';
  desc: String = '';
  status: String = '';
  banner: String = '';

  ngOnInit(): void {
    this.nom_english = this.info[0];
    this.nom_jap = this.info[1];
    this.episodes = this.info[2];
    this.studios = this.info[3];
    this.genres = this.info[4];
    this.tags = this.info[5];
    this.annee = this.info[6];
    this.season = this.info[7];
    this.format = this.info[8];
    this.image = this.info[9];
    this.score = this.info[10];
    this.desc = this.info[11];
    this.status = this.info[12];
    this.banner = this.info[13];
  }

  @Output() buttonClicked = new EventEmitter<void>();

  onClick(): void {
    this.buttonClicked.emit();
  }
}
