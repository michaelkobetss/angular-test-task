import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth-store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'front-end-test-task';

  constructor(private store: Store) {
    this.store.dispatch(AuthActions.loadUserFromLocalStorage());
  }
  ngOnInit(): void {}

}
