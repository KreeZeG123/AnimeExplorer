import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
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
