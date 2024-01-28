import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { RequestService } from './request.service';

describe('RequestService', () => {
  let service: RequestService;
  let httpClient: HttpClient;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RequestService,
        { provide: HttpClient, useValue: { get: () => of([]) } },
        { provide: Store, useValue: { select: () => of({}) } }
      ]
    });
    service = TestBed.inject(RequestService);
    httpClient = TestBed.inject(HttpClient);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data', () => {
    const spy = spyOn(httpClient, 'get').and.callThrough();
    service.getRequest('url').subscribe();
    expect(spy).toHaveBeenCalledWith('url', { headers: jasmine.any(Object) });
  });
});
