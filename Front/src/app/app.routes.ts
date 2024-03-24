import { Routes } from '@angular/router';

import { ClassementComponent } from './pages/classement/classement.component';
import { ConnectedComponent } from './pages/connected/connected.component';
import { DecouvrirComponent } from './pages/decouvrir/decouvrir.component';
import { JeuComponent } from './pages/jeu/jeu.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  { path: 'decouvrir', component: DecouvrirComponent },
  { path: 'jeu', component: JeuComponent },
  { path: 'classement', component: ClassementComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'inscription', component: SignupComponent },
  { path: 'connecte', component: ConnectedComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', component: LandingComponent },

  { path: '**', redirectTo: '/404' },
];
