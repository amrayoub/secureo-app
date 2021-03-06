import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  Subject } from 'rxjs';
import { IUser } from './iuser';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { LogginUser } from './LogginUser';
import { IPagedUsers } from './IPagedUsers';
import { PageEvent } from '@angular/material';

@Injectable()
export class UserService {
  private url = environment.REST_API_URL + 'users';

  update$: Subject<any> = new Subject<any>();
  number=0;
  pageSize=10;
  pageEvent: PageEvent;


  constructor(private http: HttpClient) {}

  getUsers(page: number, pageSize: number): Observable<IPagedUsers> {
    return this.http
      .get<IPagedUsers>(`${this.url}/?page=${page+1}&size=${pageSize}`);
  }

  getUser(id): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/${id}`) as Observable<IUser>;
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http
      .put<IUser>(`${this.url}/${user.id}`, user)
      .pipe(tap(data => this.update$.next()));
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.url}`, user)
      .pipe(tap(data => this.update$.next()));
  }

  deleteUser(id) {
    return this.http.delete(`${this.url}/${id}`).pipe(tap(data => this.update$.next()));
  }

  postUserInfos(loggedUser: LogginUser) {
    return this.http.post<LogginUser>(`${this.url}/loggin`, loggedUser);
  }
}
