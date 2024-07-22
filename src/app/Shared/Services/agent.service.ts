import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private sharedData: any;

  constructor(private http: HttpClient) {

  }
  baseUrl = environment.url;

  getAllAgents(page:number,items:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+'/manageUser/findAgents?pageIndex='+page+'&numberPerPage='+items+'&sortDirection=DESC&sortProperty=id',{ headers: reqHeader })
  }

  UpdateAgent(id:number,data:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.put(this.baseUrl+'/manageUser/updateAgentSTAFIM?id='+id,data,{ headers: reqHeader })
  }
  getAllAgencies(){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+'/agency/find?&queryValue=%5B%7B%22key%22%3A%22entreprise_id%22%2C%22operation%22%3A%22GROUP_JOIN_EQUALITY%22%2C%22value%22%3A%22'+Number(localStorage.getItem('entrepriseId'))+'%22%2C%22criteriaType%22%3A%22DEFAULT%22%2C%22jointEntity%22%3A%22entreprise%22%2C%22jointAttribut%22%3A%22id%22%7D%2C%7B%22key%22%3A%22state%22%2C%22operation%22%3A%22NEGATION%22%2C%22value%22%3A%22DELETED%22%2C%22criteriaType%22%3A%22AGENCY_STATE%22%7D%5D',{ headers: reqHeader })
 
  }

  findRole(){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+'/agency/findRole',{ headers: reqHeader })
  }


  GetAgentById(id:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+'/manageUser/findByIdAgent?id='+id,{ headers: reqHeader })
  }
  setSharedData(data: any) {
    this.sharedData = data;
  }

  getSharedData() {
    return this.sharedData;
  }

  InitData(){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.post(this.baseUrl+'/initData/initData',null,{ headers: reqHeader })
  }

  AddAgent(data:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.post(this.baseUrl+'/manageUser/registerAgent',data,{ headers: reqHeader })
  }
  deleteAgent(id:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.put(this.baseUrl+'/manageUser/deleteAgent?id='+id,null,{ headers: reqHeader })
  }
}
