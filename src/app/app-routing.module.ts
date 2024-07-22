/* tslint:disable */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './Pages/home/home.component';
import {LoginComponent} from './Auth/login/login.component';
import {ConsulterCoursesComponent} from './Pages/consulter-courses/consulter-courses.component';
import {DetailCoursesComponent} from './Pages/detail-courses/detail-courses.component';
import {SideComponent} from './Common/side/side.component';
import {AuthGuard} from './Shared/Guard/auth.guard';
import {AgentGuard} from './Shared/Guard/agent.guard';
import { AgentComponent } from './Pages/agent/agent.component';
import { AddComponent } from './Pages/agent/add/add.component';
import { UpdateComponent } from './Pages/agent/update/update.component';
import { SocieteComponent } from './Pages/societe/societe.component';
import { AddSocieteComponent } from './Pages/societe/add-societe/add-societe.component';
import { UpdateSocieteComponent } from './Pages/societe/update-societe/update-societe.component';
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

  {
    path: '',
    component: SideComponent,
    children: [
      {path: 'Map', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'ConsulterCourses', component: ConsulterCoursesComponent, canActivate: [AuthGuard]},
      {path: 'agent', component: AgentComponent, canActivate: [AuthGuard]},
      {path: 'agent/add', component: AddComponent, canActivate: [AuthGuard]},
      {path: 'societe', component: SocieteComponent, canActivate: [AuthGuard]},
      {path: 'societe/add', component: AddSocieteComponent, canActivate: [AuthGuard]},
      {path: 'societe/update', component: UpdateSocieteComponent, canActivate: [AuthGuard]},

      {path: 'agent/update/:id', component: UpdateComponent, canActivate: [AuthGuard]},
      /*{path: 'DetailCourses/:id', component: DetailCoursesComponent},*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
