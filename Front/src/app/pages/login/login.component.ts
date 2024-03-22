import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { BackEndService } from '../../services/back-end/back-end.service';

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

  private expectedPassword: string = '';

  constructor(private backEndService: BackEndService) {}

  async validateLogin(): Promise<void> {
    await this.backEndService
      .login(this.email, this.password)
      .then((result) => {
        switch (result) {
          case 'success':
            this.passwordValid = true;
            this.emailValid = true;
            break;
          case 'wrongEmail':
            this.passwordValid = false;
            this.emailValid = false;
            break;
          case 'wrongPassword':
            this.passwordValid = false;
            this.emailValid = true;
            break;
          default:
            alert('Erreur ');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion : ', error);
      });
  }
}
