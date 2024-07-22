/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../Shared/Services/storage.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DatasharingService } from '../../Shared/Services/datasharing.service';
import { AgentService } from 'src/app/Shared/Services/agent.service';
import { AuthService } from 'src/app/Shared/Services/auth.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css'],
})
export class SideComponent implements OnInit {
  url: string;
  decodedPayload: any;
  helper = new JwtHelperService();
  id: number;
  roleLibelle =''
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dataSharingService: DatasharingService,
    private storageService: StorageService,
    private agentService: AgentService,
    private authService: AuthService,

  ) {}

  ngOnInit(): void {
    //const helper = new JwtHelperService();
this.getRole()
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url;
      }
    });
  }

  
  getRole(){

    this.authService.getInfoUser(String(localStorage.getItem('token'))).subscribe((resData: any) => {

             this.roleLibelle=  resData.data.role[0].libelle
      
  
     
    });
  }
  hasRequiredRole(requiredRole: string): boolean {
    const decodedPayload = this.helper.decodeToken(
      this.storageService.getToken()
    );
    localStorage.setItem('agentId', decodedPayload.agent_id);
// console.log(decodedPayload.iss,'ydy')
    return  this.roleLibelle === requiredRole

  }

  logout() {
    this.storageService.remove();
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
