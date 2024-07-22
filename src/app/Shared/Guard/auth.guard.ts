/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../Services/storage.service';
import { AgentService } from '../Services/agent.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    private tokenStorage: StorageService,
    private agentService: AgentService
  ) {}

  canActivate(): boolean {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/login']);
      return false;
    } 
        
      return true;
    
  }
}
