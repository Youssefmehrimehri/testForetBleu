import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private apiKey: string = 'AIzaSyBZbg7vdh6WEQX17fF9fIVcZ2CYrmTdhe8';
  constructor(private http: HttpClient) {

  }
  baseUrl = environment.url;

  /*getAllDrivers(page:number,items:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.get(this.baseUrl+'/manageUser/findAllDriver?pageIndex='+page+'&numberPerPage='+items,{ headers: reqHeader })
  }*/
  getAllDrivers(page:number,items:number){
  var reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
  });
  return this.http.get(this.baseUrl+'/manageUser/findAllDriver?'+page+'&numberPerPage='+items+'&queryValue=%5B%5D&sortDirection=DESC&sortProperty=id',{ headers: reqHeader })
}


  RegisterDriver(data:any){
    var reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
  });
    return this.http.post(this.baseUrl+'/manageUser/registerDriver',data,{ headers: reqHeader })
  }

  GetDriverById(id:any){
    var reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
  });
    return this.http.get(this.baseUrl+'/manageUser/findByIdDriver?id='+id,{ headers: reqHeader })
  }

  UpdateDriver(id:any,data:any){
    var reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
  });
    return this.http.put(this.baseUrl+'/manageUser/updateDriver?id='+id,data,{ headers: reqHeader })
  }

  testApi(test:string){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.get(this.baseUrl+'/manageUser/findAllDriver?pageIndex=0&numberPerPage=10&queryValue=%5B%7B%20%22key%22%3A%22'+'firstName%22%2C%20%22'+'operation%22%3A%22'+'EQUALITY%22%2C%20%22'+'value%22%3A%22%2A'+test+'%2A%22%2C%20%22criteriaType'+'%22%3A%22DEFAULT%22%20%7D%5D'+'&sortDirection=DESC&sortProperty=id',{ headers: reqHeader })
  }

  UpdateDriverState(id:any,state:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.put(this.baseUrl+'/manageUser/changeUserState?userId='+id+'&state='+state,null,{ headers: reqHeader })
  }


  getDriverFilter(page:number,items:number,status:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.get(this.baseUrl+'/manageUser/findAllDriver?pageIndex='+page+'&numberPerPage='+items+'&queryValue=%5B%7B%20%22key%22%3A%22state%22%2C%20%22operation%22%3A%22EQUALITY%22%2C%20%22value%22%3A%22'+status+'%22%2C%20%22criteriaType%22%3A%22USER_STATE%22%20%7D%5D&sortDirection=DESC&sortProperty=id',{ headers: reqHeader })
  }

  getDriverSearch(page:number,items:number,value:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.get(this.baseUrl+'/manageUser/findAllDriver?pageIndex='+page+'&numberPerPage='+items+'&queryValue=%5B%7B%20%22key%22%3A%22firstName%22%2C%20%22operation%22%3A%22EQUALITY%22%2C%20%22value%22%3A%22%2A'+value+'%2A%22%2C%20%22criteriaType%22%3A%22DEFAULT%22%20%7D%2C%7B%20%22key%22%3A%22lastName%22%2C%20%22operation%22%3A%22EQUALITY%22%2C%20%22value%22%3A%22%2A'+value+'%2A%22%2C%20%22criteriaType%22%3A%22DEFAULT%22%2C%20%22orPredicate%22%20%3A%20true%20%7D%2C%7B%20%22key%22%3A%22phoneNumber%22%2C%20%22operation%22%3A%22EQUALITY%22%2C%20%22value%22%3A%22%2A'+value+'%2A%22%2C%20%22criteriaType%22%3A%22DEFAULT%22%2C%20%22orPredicate%22%20%3A%20true%20%7D%2C%7B%20%22key%22%3A%22cin%22%2C%20%22operation%22%3A%22EQUALITY%22%2C%20%22value%22%3A%22%2A'+value+'%2A%22%2C%20%22criteriaType%22%3A%22DEFAULT%22%2C%20%22orPredicate%22%20%3A%20true%20%7D%5D&sortDirection=DESC&sortProperty=id',{ headers: reqHeader })
  }

  getAddressFromMap(latitude: number, longitude: number): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
