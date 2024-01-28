import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUser } from '../store/auth-store/auth.selector'; 
import { first, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient, private store: Store) { }

  getRequest(url: string): Observable<any[]> {
    return this.store.select(selectUser).pipe(
      first(),
      switchMap(user => {
        const headers = new HttpHeaders({
          'X-token': localStorage.getItem("token") || ''
        });

        return this.http.get<any[]>(url, { headers });
      })
    );
  }
}
