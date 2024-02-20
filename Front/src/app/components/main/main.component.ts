import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  boardId: string = 'boardJeu';

  constructor(private navigationService: NavigationService) {
    this.navigationService.navLinkClicked$.subscribe((boardId: string) => {
      this.boardId = boardId;
    });
  }
}
