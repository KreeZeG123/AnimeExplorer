import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { ClassementComponent } from '../../components/classement/classement.component';
@Component({
  selector: 'app-board-classement',
  standalone: true,
  imports: [NavBarComponent,ClassementComponent],
  templateUrl: './board-classement.component.html',
  styleUrl: './board-classement.component.scss',
})
export class BoardClassementComponent {
  
}
