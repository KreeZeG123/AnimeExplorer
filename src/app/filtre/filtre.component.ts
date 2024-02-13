import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [],
  templateUrl: './filtre.component.html',
  styleUrl: './filtre.component.scss'
})
export class FiltreComponent {
  @Input() type_filtre1: string = '';
}
