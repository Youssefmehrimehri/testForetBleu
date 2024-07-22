import { Component, Input, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { element } from 'screenfull';
import { AgentService } from 'src/app/Shared/Services/agent.service';
import { StorageService } from 'src/app/Shared/Services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/Shared/Services/auth.service';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  helper = new JwtHelperService();
  show = localStorage.getItem('show');
  @Input() done: string;
  roleLibelle = '';
  // peugeot =String(localStorage.getItem('peugeot'))
  // citroen =String(localStorage.getItem('citroen'))
  // opel= String(localStorage.getItem('opel'))
  logos = [];
  constructor(
    private storageService: StorageService,
    private agentService: AgentService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    this.logos = JSON.parse(localStorage.getItem('logos'));
  }

  ngOnInit(): void {
    this.getRole();
  }

  getRole() {
    // this.authService
    //   .getInfoUser(String(localStorage.getItem('token')))
    //   .subscribe((resData: any) => {
    //     this.roleLibelle = resData.data.role[0].libelle;
    //   });
      this.roleLibelle = String(localStorage.getItem('Roles'))
  }
  handleImageError(event: any) {
    // console.error('Error loading image:', event);
  }
  getSafeImageUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  hasRequiredRole(requiredRole: string): boolean {
    const decodedPayload = this.helper.decodeToken(
      this.storageService.getToken()
    );
    localStorage.setItem('agentId', decodedPayload.agent_id);

    return this.roleLibelle === requiredRole;
  }
}
