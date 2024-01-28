import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListUsersComponent } from './list-users.component';
import { RequestService } from '../../../services/request.service';
import { API } from '../../../constants/API';
import { UserCardComponent } from '../../../components/user-card/user-card.component';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;
  let requestService: RequestService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsersComponent, UserCardComponent ],
      providers: [
        { provide: RequestService, useValue: { getRequest: () => of([{ id: 1, name: 'Test' }]) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsersComponent);
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
    expect(spy).toHaveBeenCalledWith(API.URL_USERS_LIST);
    expect(component.users).toEqual([{ id: 1, name: 'Test' }]);
  });
});
