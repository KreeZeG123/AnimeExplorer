import { Routes } from '@angular/router';

import { BoardClassementComponent } from './pages/board-classement/board-classement.component';
import { BoardDecouverteComponent } from './pages/board-decouverte/board-decouverte.component';
import { BoardJeuComponent } from './pages/board-jeu/board-jeu.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TestComponent } from './test/test/test.component';

export const routes: Routes = [
  { path: 'decouvrir', component: BoardDecouverteComponent },
  { path: 'jeu', component: BoardJeuComponent },
  { path: 'classement', component: BoardClassementComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: BoardJeuComponent },
  { path: 'test', component: TestComponent },

  { path: '**', component: NotFoundComponent },
];
