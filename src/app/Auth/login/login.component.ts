/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Shared/Services/auth.service';
import { StorageService } from '../../Shared/Services/storage.service';
import { AgentService } from 'src/app/Shared/Services/agent.service';
import { Toast } from 'ngx-toastr';
import { AgencyService } from 'src/app/Shared/Services/agency.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GuardServiceService } from 'src/app/Shared/Services/guard-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  AuthForm: FormGroup;
  errorLogin: boolean = false;
  helper = new JwtHelperService();
  decodedPayload: any;
  role = '';
  entrepriseId: number;
  logoAdded =false
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private agentService: AgentService,
    private agencyService: AgencyService,
    private guardService: GuardServiceService
  ) {}

  ngOnInit(): void {
    this.AuthForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
  hasRequiredRole(requiredRole: string): boolean {
    const decodedPayload = this.helper.decodeToken(
      this.storageService.getToken()
    );
    // console.log(decodedPayload,'decodedPayload')
    localStorage.setItem('agentId', decodedPayload.agent_id);

    return decodedPayload.iss.includes(requiredRole);
  }
  LoginMethod() {
    this.authService.Login(this.AuthForm.value).subscribe(
      (res: any) => {
        if (res.code == 200) {
          this.storageService.saveToken(res.data);

          this.authService.getInfoUser(res.data).subscribe((resData: any) => {
            if (resData.code == 200) {
              if (resData.data.state === 'ENABLED') {
                this.guardService.setUserRoles([
                  String(resData.data.role[0].libelle),
                ]);
                (this.role = String(resData.data.role[0].libelle)),
                  (this.decodedPayload = this.helper.decodeToken(
                    this.storageService.getToken()
                  ));
                  // console.log(this.role,'role')
                  this.entrepriseId = Number(JSON.parse(
                    JSON.stringify(this.storageService.DecodeToken(res.data))
                  ).entreprise_id)
                  // console.log(this.entrepriseId,'entrepriseid')
                  localStorage.setItem(
                    'agent_id',
                    JSON.parse(
                      JSON.stringify(this.storageService.DecodeToken(res.data))
                    ).agent_id
                  );
                  localStorage.setItem(
                    'nomAgence',
                    JSON.parse(
                      JSON.stringify(this.storageService.DecodeToken(res.data))
                    ).sub
                  );
                  localStorage.setItem(
                    'entrepriseId',
                    JSON.parse(
                      JSON.stringify(this.storageService.DecodeToken(res.data))
                    ).entreprise_id
                  );
        
                  localStorage.setItem(
                    'agency_id',
                    JSON.parse(
                      JSON.stringify(this.storageService.DecodeToken(res.data))
                    ).agency_id
                  );
                  // console.log('après localshotriie')
        
            
                  this.agencyService
                    .findAgencyById(
                      Number(
                        JSON.parse(
                          JSON.stringify(this.storageService.DecodeToken(res.data))
                        ).agency_id
                      )
                    )
                    .subscribe((res: any) => {
        
                      if (res.data.address?.latitude && res.data.address?.longitude) {
                        localStorage.setItem('lat', res.data.address?.latitude);
                        localStorage.setItem('lng', res.data.address?.longitude);
                      }
                      if (this.role === 'ENTREPRISE_SUPER_ADMIN') {
                        this.agencyService
                          .findLogoSuperAdmin(
                            this.entrepriseId
                          )
                          .subscribe((res: any) => {
                            localStorage.setItem('logos', JSON.stringify(res?.data));
                            this.logoAdded = true
                            if(this.logoAdded){
                              this.router.navigate(['Map']);
                              // console.log('admin')
        
                           }
               
        
                          });
                      } else if(this.role === 'ENTREPRISE_ADMIN' || this.role === 'ENTREPRISE_AGENT'|| this.role === 'ENTREPRISE_CLIENT') {
                        this.agencyService
                          .findLogo(res?.data.id)
                          .subscribe((res: any) => {
                            localStorage.setItem('logos', JSON.stringify(res?.data));
                            this.logoAdded = true
                            if(this.logoAdded){
                              this.router.navigate(['Map']);
                              // console.log('agent')
        
                           }
                          });
                        
                      }
                 
        
                   
                  
                    });
              } 
            } 
          });
   
        }
      },
      (error: any) => {
        this.errorLogin = true;
      }
    );
  }
  getByIdAgency() {}
}
