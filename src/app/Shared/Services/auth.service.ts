import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.url;

  Login(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/auth/signIn', data, { responseType: 'json' });
  }
  getInfoUser(token:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      "ngrok-skip-browser-warning": "69420"
    });
    return this.http.get<any>(this.baseUrl+ '/auth/info',  { headers: reqHeader})
  }
}
