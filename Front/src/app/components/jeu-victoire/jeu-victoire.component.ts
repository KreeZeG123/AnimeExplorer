import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-jeu-victoire',
  standalone: true,
  imports: [],
  templateUrl: './jeu-victoire.component.html',
  styleUrl: './jeu-victoire.component.scss'
})
export class JeuVictoireComponent {
  @Output() buttonClicked = new EventEmitter<void>();

  image : string="https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx16498-C6FPmWm59CyP.jpg"
  nom : string="One piece"
  onClick(): void {
    this.buttonClicked.emit();
  }
}
