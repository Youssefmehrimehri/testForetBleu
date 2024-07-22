import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {ToastrModule} from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {NgxSpinnerModule} from 'ngx-spinner';
import {GoogleMapsModule} from '@angular/google-maps';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Auth/login/login.component';
import { OutsideDirective } from './Shared/Directives/outside.directive';
import { ConsulterCoursesComponent } from './Pages/consulter-courses/consulter-courses.component';
import { DetailCoursesComponent } from './Pages/detail-courses/detail-courses.component';
import { MyLoaderComponent } from './Common/my-loader/my-loader.component';
import {LoaderService} from './Shared/Services/loader.service';
import {LoaderInterceptor} from './Shared/Interceptor/loader.interceptor';
import { SideComponent } from './Common/side/side.component';
import { WelcomeComponent } from './Common/welcome/welcome.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { AgentComponent } from './Pages/agent/agent.component';
import { AddComponent } from './Pages/agent/add/add.component';
import { UpdateComponent } from './Pages/agent/update/update.component';
import { MultiSelectComponent } from './Common/multi-select/multi-select.component';
import { SocieteComponent } from './Pages/societe/societe.component';
import { AddSocieteComponent } from './Pages/societe/add-societe/add-societe.component';
import { UpdateSocieteComponent } from './Pages/societe/update-societe/update-societe.component';
import { AffectAgentSocieteComponent } from './Pages/societe/affect-agent-societe/affect-agent-societe.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    OutsideDirective,
    ConsulterCoursesComponent,
    DetailCoursesComponent,
    MyLoaderComponent,
    SideComponent,
    WelcomeComponent,
    AgentComponent,
    AddComponent,
    UpdateComponent,
    MultiSelectComponent,
    SocieteComponent,
    AddSocieteComponent,
    UpdateSocieteComponent,
    AffectAgentSocieteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    Daterangepicker,
    HttpClientModule,
    NgxSliderModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    AutocompleteLibModule,
    NgxSpinnerModule,
    GoogleMapsModule,
    HttpClientModule,
  ],
  providers: [ LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
