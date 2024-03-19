import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classement.component.html',
  styleUrl: './classement.component.scss'
})
export class ClassementComponent {
  classementResult=[
    { name:"Cody",point:"245"},
    { name:"Natouf",point:"230"},
    { name:"Natouf",point:"220"},
    { name:"Natouf",point:"210"},
    { name:"Natouf",point:"200"},
    { name:"Natouf",point:"200"}
  ]
}
