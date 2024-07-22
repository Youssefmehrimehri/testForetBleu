/* tslint:disable */
import { Injectable } from '@angular/core';
import  jwt_decode from 'jwt-decode'

const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  DecodeToken(token: string): string {
    
    return jwt_decode(token);
    }
  public saveToken(token: any): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public getToken(): any | null {
    return window.localStorage.getItem(TOKEN);
  }
  public remove(){
    localStorage.removeItem(TOKEN)
  }
}
