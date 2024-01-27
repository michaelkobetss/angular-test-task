import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUser } from '../store/auth-store/auth.selector'; 
import { first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient, private store: Store) { }

  getRequest(url: string) {
    return this.store.select(selectUser).pipe(
      first(),
      switchMap(user => {
        const headers = new HttpHeaders({
          'X-token': localStorage.getItem("authToken") || ''
        });

        return this.http.get(url, { headers });
      })
    );
  }
}
