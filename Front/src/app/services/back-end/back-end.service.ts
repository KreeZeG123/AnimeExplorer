import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

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
export class BackEndService {
  // Server back end URL
  private serverURL: string = 'http://localhost:3080/';

  // L'utilisateur connecté
  private userID: any = null;
  private username: any = null;
  private email: any = null;

  private connectedPage: boolean = false;

  public interval: any;

  constructor(private httpClient: HttpClient) {}

  getUserID(): any {
    return this.userID;
  }

  getUsername(): any {
    return this.username;
  }

  getEmail(): any {
    return this.email;
  }

  async emailDisponible(email: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpClient.post<emailDisponibleResponse>(
          this.serverURL + 'emailDisponible',
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
        this.httpClient.post<LoginResponse>(this.serverURL + 'signup', {
          username: username,
          email: email,
          password: passwordMain,
        })
      );

      if (response && response.message === 'success') {
        alert('Inscription réussie !\nVous êtes connecté!');
        this.userID = response.userID;
        this.username = response.username;
        this.email = response.email;
        return true;
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
        this.httpClient.post<LoginResponse>(this.serverURL + 'login', {
          email: email,
          password: password,
        })
      );

      if (response) {
        if (response.message === 'success') {
          alert('Connexion réussie !');
          this.userID = response.userID;
          this.username = response.username;
          this.email = response.email;
          return 'success';
        } else if (response.message === 'wrongEmail') {
          alert('Wrong email');
          return 'wrongEmail';
        } else {
          alert('Wrong password');
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

  userIsConnected(): boolean {
    if (this.userID != null && this.username != null && this.email != null) {
      return true;
    } else {
      return false;
    }
  }
}
