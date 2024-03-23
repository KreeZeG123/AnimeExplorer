import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { AuthService } from '../../services/auth/auth.service';

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

  constructor(private authService: AuthService) {}

  async validateLogin(): Promise<void> {
    await this.authService
      .login(this.email, this.password)
      .then((result) => {
        switch (result) {
          case 'success':
            this.passwordValid = true;
            this.emailValid = true;
            setTimeout(() => {
              this.authService.redirectToConnected();
            }, 1000);
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
            alert('Error occurred');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion : ', error);
      });
  }

  // Quand on arrive sur la page /login on verifier si l'utilisateur est deja connecter
  ngOnInit(): void {
    if (this.authService.userIsConnected()) {
      this.authService.redirectToConnected();
    }
  }
}
