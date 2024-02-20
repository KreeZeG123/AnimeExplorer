import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  activeNavLink: string = '';

  constructor(private navigationService: NavigationService) {}

  onNavLinkClick(boardId: string) {
    this.activeNavLink = boardId;
    this.navigationService.notifyNavLinkClicked(boardId);
  }
}
