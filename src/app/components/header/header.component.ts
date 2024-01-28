import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PAGES } from '../../constants/pages';
import { Store } from '@ngrx/store'; 
import { selectUser } from '../../store/auth-store/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  @Output() menuClick = new EventEmitter();
  title = 'Test Task';
  user$ = this.store.select(selectUser); 

  constructor(private authService: AuthService, private router: Router, private store: Store) { } 

  onLogout(): void {
    this.authService.logout();
    this.router.navigate([PAGES.AUTH]);
    // this.user$.subscribe(user => {
    //   console.log(user);
    // }); 
   }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
