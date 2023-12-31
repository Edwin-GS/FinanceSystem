import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';
import { environmentProd } from '../../../../../applications/client/src/environments/environmentprod';

@Injectable({
  providedIn: 'root',
})
export class HandlerService {
  sid = '';
  route = '';

  constructor(private httpClient: HttpClient, private us: UserService) {}

  get(...opts: any[]): Observable<any> {
    this.route = this.routeBuild(opts);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `${this.sid}`);

    return this.httpClient
      .get(`${environmentProd.LEGOFT_BACKEND_URL}${this.route}`, { headers })
      .pipe(
        map((d) => {
          return this.response(d);
        })
      );
  }

  post(data: any, ...opts: any[]): Observable<any> {
    this.route = this.routeBuild(opts);

    const headers = new HttpHeaders()
      .set('Content-Type', 'text/plain')
      .set('Authorization', `${this.sid}`);

    return this.httpClient
      .post(`${environmentProd.LEGOFT_BACKEND_URL}${this.route}`, data, {
        headers,
      })
      .pipe(
        map((d) => {
          return this.response(d);
        })
      );
  }

  put(data: any, ...opts: any[]): Observable<any> {
    this.route = this.routeBuild(opts);

    const headers = new HttpHeaders()
      .set('Content-Type', 'text/plain')
      .set('Authorization', `${this.sid}`);

    return this.httpClient
      .put(`${environmentProd.LEGOFT_BACKEND_URL}${this.route}`, data, {
        headers,
      })
      .pipe(
        map((d) => {
          return this.response(d);
        })
      );
  }

  delete(...opts: any[]): Observable<any> {
    this.route = this.routeBuild(opts);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `${this.sid}`);

    return this.httpClient
      .delete(`${environmentProd.LEGOFT_BACKEND_URL}${this.route}`, { headers })
      .pipe(
        map((d) => {
          return this.response(d);
        })
      );
  }

  routeBuild(opts: any[]): string {
    this.sid = this.us.getSID();

    let parameters = '';

    for (const opt of opts) {
      parameters += `/${opt}`;
    }

    return parameters;
  }

  response(data: any) {
    if (data['sid'] !== 'open-auth' && data['sid'] !== 'handler-auth') {
      this.sid = data['sid'];
      localStorage.setItem('LEGOFT_SID_SITE', this.sid);
    }
    return data['resp'];
  }
}
