import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { MatDrawer } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';
import { MatDrawerContainer } from '@angular/material/sidenav';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      imports: [ MatDrawer,MatDrawerContainer ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit menuClick event when menu button is clicked', () => {
    spyOn(component.menuClick, 'emit');
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    expect(component.menuClick.emit).toHaveBeenCalled();
  });

  it('should toggle drawer when toggleDrawer is called', () => {
    const spy = spyOn(component.drawer, 'toggle');
    component.toggleDrawer();
    expect(spy).toHaveBeenCalled();
  });
});
