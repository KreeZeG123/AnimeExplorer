
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtre.component.html',
  styleUrl: './filtre.component.scss'
})
export class FiltreComponent {
  @Input() typeFiltre: any;

  nom: string = "";
  value: string[]=[];
  idx: number=-1;

  ngOnInit() {
    if (this.typeFiltre && this.typeFiltre.length >= 3) {
      this.nom = this.typeFiltre[0];
      this.value = this.typeFiltre[1];
      this.idx = this.typeFiltre[2];
    }
  }
} 
