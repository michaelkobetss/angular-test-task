import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ListUsersComponent } from '../../pages/users/list-users/list-users.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCardComponent, ListUsersComponent],
      providers: [{ provide: MatSnackBar, useValue: { open: () => {} } }],
      imports: [MatCard,MatCardModule,MatIconModule, MatCardHeader, MatCardTitle, MatIcon, MatCardContent,MatCardActions],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open snackbar when onEditClick is called', () => {
    const spy = spyOn(snackBar, 'open');
    component.onEditClick();
    expect(spy).toHaveBeenCalledWith(
      `Such api endpoint doesn't exist yet`,
      'Close',
      { duration: 5000 }
    );
  });

  it('should open snackbar when onDeleteClick is called', () => {
    const spy = spyOn(snackBar, 'open');
    component.onDeleteClick();
    expect(spy).toHaveBeenCalledWith(
      `Such api endpoint doesn't exist yet`,
      'Close',
      { duration: 5000 }
    );
  });
});
