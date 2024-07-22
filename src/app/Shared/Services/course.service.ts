/* tslint:disable */
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {

  }

  baseUrl = environment.url;

  AddCourse(data:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.post(this.baseUrl+'/race/create',data,{ headers: reqHeader })
  }
  UpdateClient(data:any,id:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.put(this.baseUrl+`/manageUser/updateClient?idClient=${id}`,data,{ headers: reqHeader })
  }
  verifNumber(data:string){

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.post(this.baseUrl+`/manageUser/existClient?phoneNumber=${data}`,data,{ headers: reqHeader })
  }
  getAllCoursesFiltreDate(page:any,items:any,dateOne:string,dateTwo:string){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+`/race/findAll/agent/date?pageIndex=${page}&numberPerPage=${items}&date1=${dateOne}&date2=${dateTwo}&sortDirection=DESC&sortProperty=id`,{ headers: reqHeader })
  }
  getAllCoursesFiltreDateAgentAgence(page:number,items:number,dateOne:string,dateTwo:string,agentId:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+`/race/findAll/agentAndDateFilter?agentId=${agentId}&pageIndex=${page}&numberPerPage=${items}&date1=${dateOne}&date2=${dateTwo}&sortDirection=ASC&sortProperty=id`,{ headers: reqHeader })
  }

  getCourseCurrentDay(){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+'/race/countRacesCurrentDay',{ headers: reqHeader })
  }
  getAgencyAgent(agencyid:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+'/manageUser/findAllAgentList?queryValue=%5B%7B%22key%22%3A%22agency_id%22%2C%22operation%22%3A%22GROUP_JOIN_EQUALITY%22%2C%22value%22%3A%22'+agencyid+'%22%2C%22criteriaType%22%3A%22DEFAULT%22%2C%22jointEntity%22%3A%22agency%22%2C%22jointAttribut%22%3A%22id%22%7D%5D',{ headers: reqHeader })
  }
  getAllAgent(){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+'/manageUser/findAllAgentList?queryValue=%5B%7B%22key%22%3A%22agency_id%22%2C%22operation%22%3A%22GROUP_JOIN_EQUALITY%22%2C%22value%22%3A%22'+Number(localStorage.getItem('agency_id'))+'%22%2C%22criteriaType%22%3A%22DEFAULT%22%2C%22jointEntity%22%3A%22agency%22%2C%22jointAttribut%22%3A%22id%22%7D%5D',{ headers: reqHeader })
  }
  getallregion(){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+'/agency/find?queryValue=%5B%7B%22key%22%3A%22entreprise_id%22%2C%22operation%22%3A%22GROUP_JOIN_EQUALITY%22%2C%22value%22%3A%22'+Number(localStorage.getItem('entrepriseId'))+'%22%2C%22criteriaType%22%3A%22DEFAULT%22%2C%22jointEntity%22%3A%22entreprise%22%2C%22jointAttribut%22%3A%22id%22%7D%2C%7B%22key%22%3A%22state%22%2C%22operation%22%3A%22NEGATION%22%2C%22value%22%3A%22DELETED%22%2C%22criteriaType%22%3A%22AGENCY_STATE%22%7D%5D',{ headers: reqHeader })
  }

  GetCourseByClientId(page:any,items:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    
    return this.http.get(this.baseUrl+`/race/findAll/STAFIM?pageIndex=${page}&numberPerPage=${items}&sortDirection=DESC&sortProperty=id`,{ headers: reqHeader })

  }
  getCourseFilterAgence(agencyId:number,page :number,items:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    
    return this.http.get(this.baseUrl+'/race/findAll?pageIndex='+page+'&numberPerPage='+items+'&queryValue=%5B%7B%22key%22%3A%22agency_id%22%2C%22operation%22%3A%22GROUP_JOIN_EQUALITY%22%2C%22value%22%3A%22'+agencyId+'%22%2C%22criteriaType%22%3A%22DEFAULT%22%2C%22jointEntity%22%3A%22agency%22%2C%22jointAttribut%22%3A%22id%22%7D%5D&sortDirection=ASC&sortProperty=id',{ headers: reqHeader })

  }

  getCourseFilterOnlyAgent(agentId:number,page :number,items:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    
    return this.http.get(this.baseUrl+'/race/findAll?pageIndex='+page+'&numberPerPage='+items+'&queryValue=%5B%7B%22key%22%3A%22agent_id%22%2C%22operation%22%3A%22GROUP_JOIN_EQUALITY%22%2C%22value%22%3A%22'+agentId+'%22%2C%22criteriaType%22%3A%22DEFAULT%22%2C%22jointEntity%22%3A%22agent%22%2C%22jointAttribut%22%3A%22id%22%7D%5D&sortDirection=ASC&sortProperty=id',{ headers: reqHeader })


    
  }
  
  getCourseFilterAgentAgence(agentId:number,page :number,items:number){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    
    return this.http.get(this.baseUrl+'/race/findAll?pageIndex='+page+'&numberPerPage='+items+'&queryValue=%5B%7B%22key%22%3A%22agent_id%22%2C%22operation%22%3A%22GROUP_JOIN_EQUALITY%22%2C%22value%22%3A%22'+agentId+'%22%2C%22criteriaType%22%3A%22DEFAULT%22%2C%22jointEntity%22%3A%22agent%22%2C%22jointAttribut%22%3A%22id%22%7D%5D&sortDirection=ASC&sortProperty=id',{ headers: reqHeader })


    
  }



  GetCourseByClientIdAndStatus(page:any,items:any,status:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    // Stafim
    return this.http.get(this.baseUrl+'/race/findAllByClientId?clientId=16524&pageIndex='+page+'&numberPerPage='+items+'&queryValue=%5B%7B%20%22key%22%3A%22raceState%22%2C%20%22operation%22%3A%22EQUALITY%22%2C%20%22value%22%3A%22'+status+'%22%2C%20%22criteriaType%22%3A%22RACE_STATE%22%20%7D%5D&sortDirection=DESC&sortProperty=id',{ headers: reqHeader })


  }

  SearchCourses(page:any,items:any,value:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    //Stafim
    return this.http.get(this.baseUrl+'/race/findAllByClientId?clientId=16524&pageIndex='+page+'&numberPerPage='+items+'&queryValue=%5B%20%7B%20%22key%22%3A%22numClientStaf%22%2C%20%22operation%22%3A%22CONTAINS%22%2C%20%22value%22%3A%22%2A'+value+'%2A%22%2C%20%22criteriaType%22%3A%22DEFAULT%22%2C%20%22orPredicate%22%20%3A%20true%20%7D%5D&sortDirection=DESC&sortProperty=id',{ headers: reqHeader })

    //Casino
    //return this.http.get(this.baseUrl+'/race/findAllByClientId?clientId=16788&pageIndex='+page+'&numberPerPage='+items+'&queryValue=%5B%20%7B%20%22key%22%3A%22numClientStaf%22%2C%20%22operation%22%3A%22CONTAINS%22%2C%20%22value%22%3A%22%2A'+value+'%2A%22%2C%20%22criteriaType%22%3A%22DEFAULT%22%2C%20%22orPredicate%22%20%3A%20true%20%7D%5D&sortDirection=DESC&sortProperty=id',{ headers: reqHeader })

    //Royal Garden
    //return this.http.get(this.baseUrl+'/race/findAllByClientId?clientId=16789&pageIndex='+page+'&numberPerPage='+items+'&queryValue=%5B%20%7B%20%22key%22%3A%22numClientStaf%22%2C%20%22operation%22%3A%22CONTAINS%22%2C%20%22value%22%3A%22%2A'+value+'%2A%22%2C%20%22criteriaType%22%3A%22DEFAULT%22%2C%20%22orPredicate%22%20%3A%20true%20%7D%5D&sortDirection=DESC&sortProperty=id',{ headers: reqHeader })

    //Djerba resort
    //return this.http.get(this.baseUrl+'/race/findAllByClientId?clientId=16790&pageIndex='+page+'&numberPerPage='+items+'&queryValue=%5B%20%7B%20%22key%22%3A%22numClientStaf%22%2C%20%22operation%22%3A%22CONTAINS%22%2C%20%22value%22%3A%22%2A'+value+'%2A%22%2C%20%22criteriaType%22%3A%22DEFAULT%22%2C%20%22orPredicate%22%20%3A%20true%20%7D%5D&sortDirection=DESC&sortProperty=id',{ headers: reqHeader })

    //École primaire Marie Curie
    //return this.http.get(this.baseUrl+'/race/findAllByClientId?clientId=17159&pageIndex='+page+'&numberPerPage='+items+'&queryValue=%5B%20%7B%20%22key%22%3A%22numClientStaf%22%2C%20%22operation%22%3A%22CONTAINS%22%2C%20%22value%22%3A%22%2A'+value+'%2A%22%2C%20%22criteriaType%22%3A%22DEFAULT%22%2C%20%22orPredicate%22%20%3A%20true%20%7D%5D&sortDirection=DESC&sortProperty=id',{ headers: reqHeader })

    //Palm Azur Djerba
    //return this.http.get(this.baseUrl+'/race/findAllByClientId?clientId=17160&pageIndex='+page+'&numberPerPage='+items+'&queryValue=%5B%20%7B%20%22key%22%3A%22numClientStaf%22%2C%20%22operation%22%3A%22CONTAINS%22%2C%20%22value%22%3A%22%2A'+value+'%2A%22%2C%20%22criteriaType%22%3A%22DEFAULT%22%2C%20%22orPredicate%22%20%3A%20true%20%7D%5D&sortDirection=DESC&sortProperty=id',{ headers: reqHeader })

    //Patio Mezraya
    //return this.http.get(this.baseUrl+'/race/findAllByClientId?clientId=17161&pageIndex='+page+'&numberPerPage='+items+'&queryValue=%5B%20%7B%20%22key%22%3A%22numClientStaf%22%2C%20%22operation%22%3A%22CONTAINS%22%2C%20%22value%22%3A%22%2A'+value+'%2A%22%2C%20%22criteriaType%22%3A%22DEFAULT%22%2C%20%22orPredicate%22%20%3A%20true%20%7D%5D&sortDirection=DESC&sortProperty=id',{ headers: reqHeader })

  }

  GetCourseById(id:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(this.baseUrl+'/race/findById?id='+id,{ headers: reqHeader })
  }

}
