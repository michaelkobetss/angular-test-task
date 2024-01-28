import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RequestService } from '../../services/request.service';
import { API } from '../../constants/API'; // import the API constant
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let requestService: RequestService;
  let router: Router; // add this line

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        { provide: RequestService, useValue: { getRequest: () => of({ data: [] }) } },
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    requestService = TestBed.inject(RequestService);
    router = TestBed.inject(Router); // add this line
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data on init', () => {
    const spy = spyOn(requestService, 'getRequest').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.assessments).toEqual([]);
  });

  it('should navigate to assessment graph on assessment click', () => {
    const spy = spyOn(router, 'navigate'); // change this line
    component.onAssessmentClick(1);
    expect(spy).toHaveBeenCalledWith([API.URL_USER_ASSESSMENTS_GRAPH], { queryParams: { id: 1 } });
  });
});
