import { CommonModule } from '@angular/common'; // Importez CommonModule pour ngClass
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { RouterLink } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NavBarComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  username: string = '';
  usernameValid: boolean | null = null;

  email: string = '';
  emailValid: boolean | null = null;

  passwordMain: string = '';
  passwordGreaterThanEight: boolean = false;
  passwordWithNumber: boolean = false;
  passwordWithMaj: boolean = false;
  passwordValid: boolean | null = null;

  passwordSecondary: string = '';
  passwordMatched: boolean | null = null;

  checkUsernameValid(): void {
    this.usernameValid = this.username.length >= 3;
  }

  checkEmailValid(): void {
    this.emailValid = /\S+@\S+\.\S+/.test(this.email);
  }

  checkPasswordValid(): void {
    this.passwordGreaterThanEight = this.passwordMain.length >= 8;
    this.passwordWithNumber = /\d/.test(this.passwordMain);
    this.passwordWithMaj = /[A-Z]/.test(this.passwordMain);

    this.passwordValid =
      this.passwordMain === ''
        ? null
        : this.passwordGreaterThanEight &&
          this.passwordWithNumber &&
          this.passwordWithMaj;
  }

  checkPasswordMatch(): void {
    if (this.passwordSecondary === '') {
      this.passwordMatched = null;
    } else if (
      this.passwordMain === this.passwordSecondary &&
      this.passwordValid === true
    ) {
      this.passwordMatched = true;
    } else {
      this.passwordMatched = false;
    }
  }

  validateSignup(): void {
    if (
      this.usernameValid &&
      this.emailValid &&
      this.passwordValid &&
      this.passwordMatched
    ) {
      // Requete a BDD -> inscription nouveau utilisateur
      // TODO
      alert('Inscription validée');
    } else {
      alert('Veillez a completer le formulaire correctement');
    }
  }
}
