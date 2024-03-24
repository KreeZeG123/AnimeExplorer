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
  desc: String = '';
  status: String = '';
  image: String = '';
  banner: String = '';
  studios: string[] = [];
  score: number = 0;
  genres: string[] = [];
  annee: number = 0;
  tags: string[] = [];

  ngOnInit(): void {
    this.nom_english = this.info[0];
    this.nom_jap = this.info[1];
    this.episodes = this.info[2];
    this.desc = this.info[3].replaceAll('<br>', '\n').replaceAll('</i>', '');
    this.status = this.info[4];
    this.image = this.info[5];
    this.banner = this.info[6];
    this.score = this.info[7];
    this.studios = this.info[8];
    this.genres = this.info[9];
    this.annee = this.info[10];
    this.tags = this.info[11];
  }

  @Output() buttonClicked = new EventEmitter<void>();

  onClick(): void {
    this.buttonClicked.emit();
  }
}
