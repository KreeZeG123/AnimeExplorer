import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BackEndService } from '../back-end/back-end.service';

interface httpPostResponse {
  message: string;
}

interface emailDisponibleResponse extends httpPostResponse {
  disponible: boolean;
}

interface LoginResponse extends httpPostResponse {
  userID: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private backEndService: BackEndService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  // Server back end URL
  private BackEndServerURL: string = this.backEndService.getBackEndServerURL();

  // Enregister les informations de l'utilisateur dans le localStorage
  saveUserInfo(userId: string, username: string, email: string): void {
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
  }

  // Obtenir les infos d'utilisateur depuis le localStorage
  getUserInfo() {
    return {
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
    };
  }

  // Obtenir l'ID de l'utilisateur depuis le localStorage
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Obtenir le nom d'utilisateur depuis le localStorage
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // Obtenir l'email de l'utilisateur depuis le localStorage
  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  // Effacer les informations de l'utilisateur du localStorage
  clearUserInfo(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }

  // Vérifier si l'utilisateur est connecté
  userIsConnected(): boolean {
    return localStorage.getItem('userId') !== null;
  }

  async emailDisponible(email: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpClient.post<emailDisponibleResponse>(
          this.BackEndServerURL + 'emailDisponible',
          {
            email: email,
          }
        )
      );

      if (response && response.message === 'success') {
        return response.disponible;
      } else {
        alert('Error occurred');
        return false;
      }
    } catch (error) {
      console.error('Error occurred:', error);
      return false;
    }
  }

  async signup(
    username: string,
    email: string,
    passwordMain: string
  ): Promise<Boolean> {
    try {
      const response = await firstValueFrom(
        this.httpClient.post<LoginResponse>(this.BackEndServerURL + 'signup', {
          username: username,
          email: email,
          password: passwordMain,
        })
      );

      if (response) {
        if (response.message === 'success') {
          this.saveUserInfo(response.userID, response.username, response.email);
          return true;
        } else {
          alert('Error occurred');
          return false;
        }
      } else {
        alert('Error occurred');
        return false;
      }
    } catch (error) {
      alert('Error occurred');
      console.error('Error occurred:', error);
      return false;
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpClient.post<LoginResponse>(this.BackEndServerURL + 'login', {
          email: email,
          password: password,
        })
      );

      if (response) {
        if (response.message === 'success') {
          this.saveUserInfo(response.userID, response.username, response.email);
          return 'success';
        } else if (response.message === 'wrongEmail') {
          return 'wrongEmail';
        } else {
          return 'wrongPassword';
        }
      } else {
        alert('Error occurred');
        return 'error';
      }
    } catch (error) {
      alert('Error occurred');
      console.error('Error occurred:', error);
      return 'error';
    }
  }

  // Deconnecter l'utilisateur
  logout(): void {
    this.clearUserInfo();
  }

  // Rediriger l'utilisateur vers la page connected
  redirectToConnected(): void {
    this.router.navigateByUrl('/connecte');
  }
}
