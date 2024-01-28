import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { LayoutComponent } from './components/layout/layout.component'; 
import { MatCardModule } from '@angular/material/card';
import { FormBuilder } from '@angular/forms';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { MatDrawer } from '@angular/material/sidenav';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>; // ComponentFixture is now recognized
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatDrawerContainer,
        MatDrawer
      ],
      declarations: [
        AppComponent,
        LayoutComponent // add this line
      ],
      providers: [
        FormBuilder,
        { provide: Store, useValue: { dispatch: () => {} } }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });
  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it(`should have as title 'front-end-test-task'`, () => {
    expect(appComponent.title).toEqual('front-end-test-task');
  });

  it('should dispatch loadUserFromLocalStorage action on init', () => {
    const spy = spyOn(store, 'dispatch');
    appComponent.ngOnInit(); // ngOnInit is now recognized
    expect(spy).toHaveBeenCalled();
  });
});
