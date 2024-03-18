import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vignette',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vignette.component.html',
  styleUrl: './vignette.component.scss'
})
export class VignetteComponent {
  @Input() vignette: any;

  nom: string = "";
  image: string = "";

  
  ngOnInit(): void { 
    if (this.vignette && this.vignette.length === 2) {
      this.nom = this.vignette[0];
      this.image = this.vignette[1];
    }
  }
}
