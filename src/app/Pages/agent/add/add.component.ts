import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AgentService } from 'src/app/Shared/Services/agent.service';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { StorageService } from 'src/app/Shared/Services/storage.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  list: any[];
  roles: any[];
  roleInput: any;
  agencyInput: any;
  nomVide = false;
  agency: any;
  passwordVide = false;
  usernameVide = false;
  passwordError = false;
  emailVide = false;
  emailError = false;
  prenomide = false;
  init: any;
  role: any;
  roleLibelle =''
  passwordPattern =
    "/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$/";

  showPassword = false;
  helper = new JwtHelperService();

  AddAgentForm: FormGroup;

  constructor(
    private agentService: AgentService,
    private toastr: ToastrService,
    private storageService: StorageService,
    private authService: AuthService,

    private router: Router,
    private fb: FormBuilder
  ) {
    /*   this.list =
         [
           {id:1, name :'SuperAdmin',checked : false},
           {id:2, name :'Admin',checked : false},
           {id:3, name :'Agent',checked : false},
         ]*/
  }

  ngOnInit(): void {
    this.getRole()
this.getRoles()
    this.getAgency();
      this.AddAgentForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      roleId: new FormControl([''], [Validators.required]),
      agencyId: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$/
        ),
      ]),

      userName: new FormControl('', [Validators.required]),
    });
  }

  getRoles() {
    this.agentService.findRole().subscribe((res: any) => {
      this.role = res.data;
    });
  }
  getAgency() {
    this.agentService.getAllAgencies().subscribe((res: any) => {
      // console.log(res, 'res');
      this.agency = res.data;
    });
  }

  checkFirstName() {
    if (this.AddAgentForm.get('firstName').value) {
      this.nomVide = false;
    }
    if (this.AddAgentForm.get('firstName').value === '') {
      this.nomVide = true;
    }
  }

  checkLastName() {
    if (this.AddAgentForm.get('lastName').value) {
      this.prenomide = false;
    }
    if (this.AddAgentForm.get('lastName').value === '') {
      this.prenomide = true;
    }
  }

  checkEmail() {
    if (this.AddAgentForm.get('email').value) {
      this.emailVide = false;
    }
    if (this.AddAgentForm.get('email').invalid) {
      this.emailError = true;
    }
    if (this.AddAgentForm.get('email').value === '') {
      this.emailVide = true;
    }
    if (this.AddAgentForm.get('email').valid) {
      this.emailError = false;
    }
  }

  checkUsername() {
    if (this.AddAgentForm.get('userName').value) {
      this.usernameVide = false;
    }
    if (this.AddAgentForm.get('userName').value === '') {
      this.usernameVide = true;
    }
  }
  checkPassword() {
    if (this.AddAgentForm.get('password').value) {
      this.passwordVide = false;
    }
    if (this.AddAgentForm.get('password').invalid) {
      this.passwordError = true;
    }
    if (this.AddAgentForm.get('password').value === '') {
      this.passwordVide = true;
      this.passwordError = false;
    }
    if (this.AddAgentForm.get('password').valid) {
      this.passwordError = false;
    }
  }

  getRole(){

    this.authService.getInfoUser(String(localStorage.getItem('token'))).subscribe((resData: any) => {

             this.roleLibelle=  resData.data.role[0].libelle
      
       
  
     
    });
  }
  hasRequiredRole(requiredRole: string): boolean {
    // const decodedPayload = this.helper.decodeToken(
    //   this.storageService.getToken()
    // );
    // localStorage.setItem('agentId', decodedPayload.agent_id);
// console.log(this.roleLibelle,'lieblle')
    return  this.roleLibelle === requiredRole;
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  shareCheckedList(item: any[]) {
    this.roles = item;
  }

  AddAgent() {
    //console.log(this.AddAgentForm.value)
  
    this.AddAgentForm.setValue({
      roleId: Number(this.AddAgentForm.get('roleId').value),
      firstName: this.AddAgentForm.get('firstName').value,
      lastName: this.AddAgentForm.get('lastName').value,

      userName: this.AddAgentForm.get('userName').value,

      agencyId: Number(this.AddAgentForm.get('agencyId').value),
      password: this.AddAgentForm.get('password').value,
      email: this.AddAgentForm.get('email').value,
    });

    // if (this.AddAgentForm.invalid) {
    //   this.toastr.error('tous les champs sont obligatoire');
    // }
    if (!this.AddAgentForm.get('firstName').value) {
      this.nomVide = true;
    }
    if (!this.AddAgentForm.get('lastName').value) {
      this.prenomide = true;
    }
    if (!this.AddAgentForm.get('userName').value) {
      this.usernameVide = true;
    }
    if (!this.AddAgentForm.get('email').value) {
      this.emailVide = true;
    }
    if (!this.AddAgentForm.get('password').value) {
      this.passwordVide = true;
    }
    if (
      !this.nomVide &&
      !this.prenomide &&
      !this.emailVide &&
      !this.passwordVide &&
      !this.usernameVide &&
      !this.emailError &&
      !this.passwordError
    ) {
      // console.log(this.AddAgentForm.value, 'value');
      this.agentService
        .AddAgent(this.AddAgentForm.value)
        .subscribe((n: any) => {
          if (n.msg === 'EmailUsedException') {
            this.router.navigate(['agent/add']);

            this.toastr.error('Svp, vérifiez votre email', 'Erreur', {
              closeButton: true,
            });
          }
          if (n.msg === 'UserNameUsedException') {
            this.router.navigate(['agent/add']);

            this.toastr.error('Svp, vérifiez votre user name', 'Erreur', {
              closeButton: true,
            });
          }
          if (n.msg === 'success') {
            this.toastr.success('Ajout Agent avec succès', 'succès', {
              closeButton: true,
            });
            this.router.navigate(['agent']);
          }
        });
    }
  }

  shareIndividualCheckedList(item: {}) {
    //console.log("2",item);
  }
}
