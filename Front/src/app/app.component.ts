import { Component } from '@angular/core';
import { BoardJeuComponent } from './pages/board-jeu/board-jeu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [BoardJeuComponent],
})
export class AppComponent {
  title = 'AnimeExplorer';
}
