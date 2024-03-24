
import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './filtre.component.html',
  styleUrl: './filtre.component.scss'
})
export class FiltreComponent {
  @Input() typeFiltre: any;

  nom: string = "";
  value: string[]=[];

  optionSelectionne: string = "";

  @Output() optionSelectionneeChange = new EventEmitter<string>()

  onOptionSelectionneeChange() {
    this.optionSelectionneeChange.emit(this.optionSelectionne);
  }

  ngOnInit(): void {
    if (this.typeFiltre && this.typeFiltre.length >= 2) {
      this.nom = this.typeFiltre[0];
      this.value = this.typeFiltre[1].map((element: string) => element.replace(/_/g, ' '));
    }
  }
  
} 
