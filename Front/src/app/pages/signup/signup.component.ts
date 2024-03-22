import { CommonModule } from '@angular/common'; // Importez CommonModule pour ngClass
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { RouterLink } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { BackEndService } from '../../services/back-end/back-end.service'; // Importez le service BackEndService

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

  alertMessage: string = '';

  constructor(private backEndService: BackEndService) {}

  checkUsernameValid(): void {
    this.usernameValid = this.username.length >= 3;
  }

  checkEmailValid(): void {
    if (this.email === '') {
      this.emailValid = null;
    } else if (/\S+@\S+\.\S+/.test(this.email)) {
      this.emailValid = true;
    } else {
      this.emailValid = false;
    }
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

    this.checkPasswordMatch();
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

  async checkEmailDisponible(): Promise<void> {
    await this.backEndService
      .emailDisponible(this.email)
      .then((result) => {
        const res = result == true;
        if (result == true) {
          this.emailValid = true;
        } else {
          this.emailValid = false;
          this.alertMessage += 'Email déjà utilisé\n';
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la vérification de l'email : ", error);
      });
  }

  async validateSignup(): Promise<void> {
    if (this.email === '') {
      return;
    }

    this.alertMessage = '';
    await this.checkEmailDisponible();

    if (
      this.usernameValid &&
      this.emailValid &&
      this.passwordValid &&
      this.passwordMatched
    ) {
      this.backEndService
        .signup(this.username, this.email, this.passwordMain)
        .then((result) => {
          if (result) {
            this.alertMessage += 'Inscription validée';
            alert(this.alertMessage);
            alert('4');
            if (this.backEndService.userIsConnected()) {
              alert('Bienvenue ' + this.backEndService.getUsername());
            }
          } else {
            console.error('Erreur lors de linscription');
          }
        })
        .catch((error) => {
          console.error('Erreur lors de linscription : ', error);
        });
    } else {
      alert(this.alertMessage);
      this.alertMessage += 'Veillez a completer le formulaire correctement';
    }
  }
}
