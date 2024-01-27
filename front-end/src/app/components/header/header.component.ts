import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PAGES } from '../../constants/pages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  title = 'Test Task';

  constructor(private authService: AuthService, private router: Router) { }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate([PAGES.AUTH]);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
