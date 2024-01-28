import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthComponent } from './auth.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule // add this line
      ],
      declarations: [
        AuthComponent
      ],
      providers: [
        FormBuilder,
        { provide: Store, useValue: { dispatch: () => {} } }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on init', () => {
    component.ngOnInit();
    expect(component.loginForm.value).toEqual({ username: '', password: '' });
  });

  it('should dispatch login action on submit if form is valid', () => {
    const spy = spyOn(store, 'dispatch');
    component.loginForm.setValue({ username: 'test', password: 'test' });
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('should not dispatch login action on submit if form is invalid', () => {
    const spy = spyOn(store, 'dispatch');
    component.loginForm.setValue({ username: '', password: '' });
    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });
});
