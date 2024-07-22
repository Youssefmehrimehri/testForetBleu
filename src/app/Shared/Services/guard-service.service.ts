import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardServiceService {
  private userRoles: string[] = [ ]; // Stockez les rôles de l'utilisateur ici

  constructor(public router: Router,private tokenStorage:StorageService) { }

  canActivate():boolean{
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  setUserRoles(roles: string[]) {
    this.userRoles = roles;
    localStorage.setItem('Roles',this.userRoles[0])
  }

  getUserRoles(): string[] {
    // console.log(this.userRoles,'userRoles')
    return this.userRoles;
  }

  isLoggedIn(): boolean {
    // Ajoutez votre logique de validation de connexion ici
    if(localStorage.getItem('Roles')){
      return true ;

    }else {
      return false
    }
  }
}
