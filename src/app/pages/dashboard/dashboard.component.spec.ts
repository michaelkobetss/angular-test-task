import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RequestService } from '../../services/request.service';
import { API } from '../../constants/API'; 
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let requestService: RequestService;
  let router: Router;

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
    router = TestBed.inject(Router);
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
    const spy = spyOn(router, 'navigate'); 
    component.onAssessmentClick(1);
    expect(spy).toHaveBeenCalledWith([API.URL_USER_ASSESSMENTS_GRAPH], { queryParams: { id: 1 } });
  });
});
