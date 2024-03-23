import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-connected',
  standalone: true,
  imports: [NavBarComponent, CommonModule],
  templateUrl: './connected.component.html',
  styleUrl: './connected.component.scss',
})
export class ConnectedComponent {
  constructor(private authService: AuthService) {}

  currentUserName: string = '';

  userIsConnected(): boolean {
    let result: boolean = this.authService.userIsConnected();
    if (result) {
      this.currentUserName = this.authService.getUsername() || '';
    }
    return result;
  }
}
