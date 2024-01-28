import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AssessmentGraphComponent } from './assessment-graph.component';
import { RequestService } from '../../services/request.service';

describe('AssessmentGraphComponent', () => {
  let component: AssessmentGraphComponent;
  let fixture: ComponentFixture<AssessmentGraphComponent>;
  let requestService: RequestService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentGraphComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: RequestService, useValue: { getRequest: () => of({ data: { '2020': 1 }, type: 'bar' }) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentGraphComponent);
    component = fixture.componentInstance;
    requestService = TestBed.inject(RequestService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data on init', () => {
    const spy = spyOn(requestService, 'getRequest').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.chartLabels).toEqual(['2020']);
    expect(component.chartData).toEqual([{ data: [1], label: 'Assessment Data' }]);
    expect(component.chartType).toEqual('bar');
  });
});
