import { Routes } from '@angular/router';

import { BoardClassementComponent } from './pages/board-classement/board-classement.component';
import { BoardDecouverteComponent } from './pages/board-decouverte/board-decouverte.component';
import { BoardJeuComponent } from './pages/board-jeu/board-jeu.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: 'decouvrir', component: BoardDecouverteComponent },
  { path: 'jeu', component: BoardJeuComponent },
  { path: 'classement', component: BoardClassementComponent },
  { path: '**', component: NotFoundComponent },
];
