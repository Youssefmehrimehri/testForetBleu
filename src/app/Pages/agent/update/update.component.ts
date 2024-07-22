import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { agent } from 'src/app/Shared/Models/agent';
import { AgentService } from 'src/app/Shared/Services/agent.service';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { DriverService } from 'src/app/Shared/Services/driver.service';
import { StorageService } from 'src/app/Shared/Services/storage.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  UpdateAgentForm: FormGroup;
  agentId: number;
  role: any;
  agency: any;
  AgentData: any;

  list: any[];
  roles: any[];
  init: any;
  updateData = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    agencyId: 0,
    roleId: 0,
    email: '',
  };
  StatesData: any;
  showPassword = false;
  receivedData: any;
  agencyId!: number;
  email!: string;
  firstName!: string;
  password = '';
  lastName!: string;
  userName!: string;
  roleIds!: number;
  UpdateStateDriverForm: FormGroup;
  roleLibelle = ''
  helper = new JwtHelperService();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService,
    private driverService: DriverService,
    private toastr: ToastrService,
    private storageService: StorageService,
    private authService: AuthService,

    private fb: FormBuilder
  ) {
    /* Init data */
    /*    this.agentService.GetAgentById(this.route.snapshot.params.id).subscribe((res:any)=>{
      this.AgentData=res.data
    })*/
  }

  ngOnInit() {
    this.getRole()
    // this.getRoles();
    this.getAgency();
    this.agentId = this.route.snapshot.params.id;

    this.getByidAgent();

    // this.UpdateAgentForm = this.fb.group({
    //   firstName: new FormControl('', [Validators.required]),
    //   lastName: new FormControl('', [Validators.required]),
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   roleIds: new FormControl(),
    //   agencyId: new FormControl(),

    //   userName: new FormControl('', [Validators.required]),
    //   state: '',
    // });
  }
    
  getRole(){

    this.authService.getInfoUser(String(localStorage.getItem('token'))).subscribe((resData: any) => {

             this.roleLibelle=  resData.data.role[0].libelle
      
  
     
    });
  }
  getByidAgent() {
    this.agentService.GetAgentById(this.agentId).subscribe((res: any) => {
      this.AgentData = res.data;
      // console.log(this.AgentData, 'agentData');
      this.userName = this.AgentData.userName;
      this.firstName = this.AgentData.firstName;
      this.lastName = this.AgentData.lastName;
      this.email = this.AgentData.email;
     if(this.AgentData.password){
      this.password = this.AgentData.password
     }else {
      this.password = ''
     }
      this.agencyId = this.AgentData.agency.id;
      this.roleIds = this.AgentData.roles[0].id;
    });

    // console.log(this.UpdateAgentForm.value, 'valueForm');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  getRoles() {
    this.agentService.findRole().subscribe((res: any) => {
      // console.log(res, 'res');
      this.role = res.data;
    });
  }
  getAgency() {
    this.agentService.getAllAgencies().subscribe((res: any) => {
      // console.log(res, 'res');
      this.agency = res.data;
    });
  }
  UpdateAgent() {
    // let roleTable = [];
    // roleTable.push(Number(this.UpdateAgentForm.get('roleIds').value));
    // this.UpdateAgentForm.setValue({
    //   roleIds: roleTable,
    //   firstName: this.UpdateAgentForm.get('firstName').value,
    //   lastName: this.UpdateAgentForm.get('lastName').value,

    //   userName: this.UpdateAgentForm.get('userName').value,

    //   agencyId: Number(this.UpdateAgentForm.get('agencyId').value),
    //   email: this.UpdateAgentForm.get('email').value,
    // });
    if (this.password === '') {
      this.updateData.password = 'uAU>3*tjS;M8lp<7';
    } else {
      this.updateData.password = this.password;
    }
    this.updateData.agencyId = this.agencyId;
    this.updateData.roleId = this.roleIds;
    this.updateData.email = this.email;
    this.updateData.userName = this.userName;
    this.updateData.firstName = this.firstName;
    this.updateData.lastName = this.lastName;

    // console.log(this.updateData, 'updat');
    this.agentService
      .UpdateAgent(this.agentId, this.updateData)
      .subscribe((n: any) => {
        // console.log(n, 'nn');
        if (n.msg === 'EmailUsedException') {
          this.router.navigate(['agent/update']);

          this.toastr.error('Svp, vérifiez votre email', 'succès', {
            closeButton: true,
          });
        }
        if (n.msg === 'UserNameUsedException') {
          this.router.navigate(['agent/update']);

          this.toastr.error('Svp, vérifiez votre user name', 'succès', {
            closeButton: true,
          });
        }
        if (n.msg === 'success') {
          this.toastr.success("Mise à jour d'agent avec succès", 'succès', {
            closeButton: true,
          });
          this.router.navigate(['agent']);
        }

        // console.log(n, 'n');
      });
  }
  hasRequiredRole(requiredRole: string): boolean {
    const decodedPayload = this.helper.decodeToken(
      this.storageService.getToken()
    );
    localStorage.setItem('agentId', decodedPayload.agent_id);

    return this.roleLibelle === requiredRole;
  }
  shareCheckedList(item: any[]) {
    this.roles = item;
  }
  shareIndividualCheckedList(item: {}) {
    //console.log("2",item);
  }

  onChangeState(ev: any) {
    this.driverService
      .UpdateDriverState(this.route.snapshot.params.id, ev.target.value)
      .subscribe(
        (res: any) => {
          this.toastr.success('Modification statut avec succées', 'Succées', {
            closeButton: true,
          });
        },
        (error) => {
          this.toastr.error(
            "une erreur s'est produite pour afficher les chauffeurs",
            'Erreur',
            {
              closeButton: true,
            }
          );
        }
      );
  }
}
