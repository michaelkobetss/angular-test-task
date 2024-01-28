import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AssessmentCardComponent } from './assessment-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';

describe('AssessmentCardComponent', () => {
  let component: AssessmentCardComponent;
  let fixture: ComponentFixture<AssessmentCardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatToolbarModule,
        MatIcon
      ],
      declarations: [
        AssessmentCardComponent
      ],
    }).compileComponents();


    fixture = TestBed.createComponent(AssessmentCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display assessment name', () => {
    component.assessment = { name: 'Test Assessment' };
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    expect(title.textContent).toContain('Test Assessment');
  });

  it('should navigate to graph on button click', () => {
    component.assessment = { id: 1 };
    fixture.detectChanges();
    spyOn(router, 'navigate');
    const button = fixture.debugElement.query(By.css('.view-graph button')).nativeElement;
    button.click();
    expect(router.navigate).toHaveBeenCalledWith(['/assessment-graph/0']);
  });
});
