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
  id:  number=0;

  
  ngOnInit(): void { 
    if (this.vignette && this.vignette.length === 3) {
      this.nom = this.vignette[0];
      this.image = this.vignette[1];
      this.id = this.vignette[2];
    }
  }
}
