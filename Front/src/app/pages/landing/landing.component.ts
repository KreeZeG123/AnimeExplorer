import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavBarComponent,RouterLink,RouterLinkActive],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
