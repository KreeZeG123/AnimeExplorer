import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { RankingComponent } from '../../components/ranking/ranking.component';

@Component({
  selector: 'app-classement',
  standalone: true,
  imports: [NavBarComponent, RankingComponent],
  templateUrl: './classement.component.html',
  styleUrl: './classement.component.scss',
})
export class ClassementComponent {}
