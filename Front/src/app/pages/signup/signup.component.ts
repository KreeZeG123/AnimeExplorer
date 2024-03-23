import { CommonModule } from '@angular/common'; // Importez CommonModule pour ngClass
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { RouterLink } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NavBarComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  // Variables pour les valeurs tapées dans les champs du formulaire
  usernameFormValue: string = '';
  emailFormValue: string = '';
  passwordMainFormValue: string = '';
  passwordSecondaryFormValue: string = '';

  // Variables qui indiquent si les valeurs tapées dans les champs du formulaire respectent les contraintes
  passwordGreaterThanEight: boolean = false;
  passwordWithNumber: boolean = false;
  passwordWithMaj: boolean = false;

  // Variables qui indiquent si les valeurs tapées dans les champs du formulaire sont valides
  usernameValid: boolean | null = null;
  emailValid: boolean | null = null;
  passwordValid: boolean | null = null;

  // Variable qui indique si les deux mots de passe tapés sont identiques
  passwordMatched: boolean | null = null;

  constructor(private authService: AuthService) {}

  checkUsernameValid(): void {
    this.usernameValid = this.usernameFormValue.length >= 3;
  }

  checkEmailValid(): void {
    if (this.emailFormValue === '') {
      this.emailValid = null;
    } else if (/\S+@\S+\.\S+/.test(this.emailFormValue)) {
      this.emailValid = true;
    } else {
      this.emailValid = false;
    }
  }

  checkPasswordValid(): void {
    this.passwordGreaterThanEight = this.passwordMainFormValue.length >= 8;
    this.passwordWithNumber = /\d/.test(this.passwordMainFormValue);
    this.passwordWithMaj = /[A-Z]/.test(this.passwordMainFormValue);

    this.passwordValid =
      this.passwordMainFormValue === ''
        ? null
        : this.passwordGreaterThanEight &&
          this.passwordWithNumber &&
          this.passwordWithMaj;

    this.checkPasswordMatch();
  }

  checkPasswordMatch(): void {
    if (this.passwordSecondaryFormValue === '') {
      this.passwordMatched = null;
    } else if (
      this.passwordMainFormValue === this.passwordSecondaryFormValue &&
      this.passwordValid === true
    ) {
      this.passwordMatched = true;
    } else {
      this.passwordMatched = false;
    }
  }

  async checkEmailDisponible(): Promise<void> {
    await this.authService
      .emailDisponible(this.emailFormValue)
      .then((result) => {
        const res = result == true;
        if (result == true) {
          this.emailValid = true;
        } else {
          this.emailValid = false;
          this.emailFormValue = 'Email déjà utilisé !';
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la vérification de l'email : ", error);
      });
  }

  estComplet(): boolean {
    // Verifie les champs du formulaire
    this.checkEmailValid();
    this.checkPasswordValid();
    this.checkUsernameValid();
    this.checkPasswordMatch();

    if (
      this.usernameValid &&
      this.emailValid &&
      this.passwordValid &&
      this.passwordMatched
    ) {
      return true;
    }

    // Si les champs sont encore vide on les mets a false
    this.usernameValid ??= false;
    this.emailValid ??= false;
    this.passwordValid ??= false;
    this.passwordMatched ??= false;

    return false;
  }

  async validateSignup(): Promise<void> {
    if (!this.estComplet()) {
      return;
    }

    await this.checkEmailDisponible();

    if (
      this.usernameValid &&
      this.emailValid &&
      this.passwordValid &&
      this.passwordMatched
    ) {
      this.authService
        .signup(
          this.usernameFormValue,
          this.emailFormValue,
          this.passwordMainFormValue
        )
        .then((result) => {
          if (result) {
            setTimeout(() => {
              this.authService.redirectToConnected();
            }, 1000);
          } else {
            console.error('Erreur lors de linscription');
          }
        })
        .catch((error) => {
          console.error('Erreur lors de linscription : ', error);
        });
    }
  }

  // Quand on arrive sur la page /signup on verifier si l'utilisateur est deja connecter
  ngOnInit(): void {
    if (this.authService.userIsConnected()) {
      this.authService.redirectToConnected();
    }
  }
}
