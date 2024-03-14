import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavBarComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  emailValid: boolean | null = null;

  password: string = '';
  passwordValid: boolean | null = null;

  emailIsValid(): void {
    // TODO Requete a BDD -> recherche si email exist
    // cherche username, recupère usernam + mdp crypté
    if (this.email === '') {
      this.emailValid = null;
    } else if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.emailValid = false;
    } else if (this.email.length >= 5) {
      // Temporaire
      this.emailValid = true;
    } else {
      this.emailValid = false;
    }
  }

  passwordIsValid(): void {
    // TODO Requete a BDD -> verifie si le password est correct
    // crypte le mdp donnée, compare avec le mdp crypté correspondant a l'email
    if (this.password === '') {
      this.passwordValid = null;
    } else if (this.password.length >= 8) {
      // Temporaire
      this.passwordValid = true;
    } else {
      this.passwordValid = false;
    }
  }

  validateLogin(): void {
    this.emailIsValid();
    this.passwordIsValid();

    if (this.emailValid && this.passwordValid) {
      alert('Connexion avec succès');
    } else {
      alert('Veillez a bien remplir les champs correctement');
    }
  }
}
