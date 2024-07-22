/* tslint:disable */
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) {

  }

  baseUrl = environment.url;


  GetAllSettings(){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(this.baseUrl+'/settings/findAll',{ headers: reqHeader })
  }

  GetAllBusy(){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(this.baseUrl+'/settings/findAllBusyHours',{ headers: reqHeader })
  }

  GetParamsByIdRegion(id:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',

    });
    return this.http.get(this.baseUrl+'/settings/findByIdRegion?id='+id,{ headers: reqHeader })
  }

  GetAllBusyByid(id:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',

    });
    return this.http.get(this.baseUrl+'/settings/findBusyHoursByIdRegion?id='+id,{ headers: reqHeader })
  }
  
  fetchApiKey() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl + '/googleKey/findMain', {
      headers: reqHeader,
    });
  }
}
