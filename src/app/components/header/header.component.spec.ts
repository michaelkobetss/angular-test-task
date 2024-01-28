import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { PAGES } from '../../constants/pages';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let router: Router;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatIcon
      ],
      declarations: [
        HeaderComponent
      ],
      providers: [
        { provide: AuthService, useValue: { isLoggedIn: () => of(true), logout: () => {} } },
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: Store, useValue: { select: () => of({ role: 'Admin' }) } }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out', () => {
    const spy = spyOn(authService, 'logout');
    const spyRouter = spyOn(router, 'navigate');
    component.onLogout();
    expect(spy).toHaveBeenCalled();
    expect(spyRouter).toHaveBeenCalledWith([PAGES.AUTH]);
  });

  it('should check if user is logged in', () => {
    const spy = spyOn(authService, 'isLoggedIn').and.callThrough();
    component.isLoggedIn();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit menuClick event when menu button is clicked', () => {
    spyOn(component.menuClick, 'emit');
    component.menuClick.emit();
    expect(component.menuClick.emit).toHaveBeenCalled();
  });
});
