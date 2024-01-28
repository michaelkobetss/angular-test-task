import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.sass']
})
export class UserCardComponent {
  @Input() user: any;

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  onEditClick() {
    this.snackBar.open(`Such api endpoint doesn't exist yet`, 'Close', {
      duration: 5000,
    });
  }

  onDeleteClick() {
    this.snackBar.open(`Such api endpoint doesn't exist yet`, 'Close', {
      duration: 5000,
    });
  }
}
