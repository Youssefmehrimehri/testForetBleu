/* tslint:disable */
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService} from '../Services/storage.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AgentGuard implements CanActivate {
  constructor(private router: Router,private storageService:StorageService) {}

  /*canActivate(): boolean {
    const helper = new JwtHelperService();
    const decodedPayload = helper.decodeToken(this.storageService.getToken());

    // Replace 'administration' with the necessary role(s) or permission(s) for the specific route(s)
    const requiredRoles = ['stafimAdmin'];

    // Check if the user has any of the required roles/permissions
    const hasRequiredRole = requiredRoles.some(role => decodedPayload.iss === role);

    if (decodedPayload.sub ==='stafimAdmin') {
      return true; // Allow access to the route for users with required roles/permissions
    } else {
      // Redirect to a different page (e.g., home page) if the user does not have the necessary permission
      this.router.navigate(['/ConsulterCourses']);
      return false;
    }
  }*/
  canActivate(): boolean {
    const helper = new JwtHelperService();
    const decodedPayload = helper.decodeToken(this.storageService.getToken());

    // Replace 'administration' with the necessary role(s) or permission(s) for the specific route(s)
    const requiredRoles = ['ENTREPRISE_ADMIN'];

    // Check if the user has any of the required roles/permissions
    const hasRequiredRole = requiredRoles.some(role => decodedPayload.iss.includes(role));

    if (hasRequiredRole) {
      return true; // Allow access to the route for users with required roles/permissions
    } else {
      // Redirect to a different page (e.g., home page) if the user does not have the necessary permission
      this.router.navigate(['/ConsulterCourses']);
      return false;
    }
  }


}
