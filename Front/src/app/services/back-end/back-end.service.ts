import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface LoginResponse {
  message: string;
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

  constructor(private httpClient: HttpClient) {}

  getUsername(): string {
    return this.username;
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
          alert('Login success');
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
}
