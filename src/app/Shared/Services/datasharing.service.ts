/* tslint:disable */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {

  private sharedData: any;

  constructor() { }

  setData(data: any) {
    this.sharedData = data;
  }

  getData() {
    return this.sharedData;
  }
}
