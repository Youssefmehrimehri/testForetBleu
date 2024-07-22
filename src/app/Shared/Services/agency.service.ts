import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor( private http: HttpClient) { }
  baseUrl = environment.url;

  getAllAgency(page:number,items:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+'/agency/findAll?pageIndex='+page+'&numberPerPage='+items+'&queryValue=%5B%7B%22key%22%3A%22entreprise_id%22%2C%22operation%22%3A%22GROUP_JOIN_EQUALITY%22%2C%22value%22%3A%22'+Number(localStorage.getItem('entrepriseId'))+'%22%2C%22criteriaType%22%3A%22DEFAULT%22%2C%22jointEntity%22%3A%22entreprise%22%2C%22jointAttribut%22%3A%22id%22%7D%2C%7B%22key%22%3A%22state%22%2C%22operation%22%3A%22NEGATION%22%2C%22value%22%3A%22DELETED%22%2C%22criteriaType%22%3A%22AGENCY_STATE%22%7D%5D&sortDirection=DESC&sortProperty=id',{ headers: reqHeader })
 
  }
  
  addAgency(data:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.post(this.baseUrl+'/agency/add',data,{ headers: reqHeader })
  }
  
  updateAgency(data:any,idAgency:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.put(this.baseUrl+'/agency/update?agencyId='+idAgency,data,{ headers: reqHeader })
  }
  findAgencyById(idAgency:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+'/agency/findById?agencyId='+idAgency,{ headers: reqHeader })
  }
  findLogoSuperAdmin(idEntreprise:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+'/logo/findByEntrepriseId?entrepriseId='+idEntreprise,{ headers: reqHeader })
  }
  findLogo(idAgence:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+'/logo/findByAgencyId?agencyId='+idAgence,{ headers: reqHeader })
  }

  
  
  deleteAgency(idAgency:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.put(this.baseUrl+'/agency/delete?agencyId='+idAgency,null,{ headers: reqHeader })
  }



}
