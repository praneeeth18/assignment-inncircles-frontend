import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { IssuesPageComponent } from './components/issues-page/issues-page.component';
import { NavbarComponent } from './components/navbar/navbar.component'
import { AgGridModule } from 'ag-grid-angular';
import { IssueFormComponent } from './components/issue-form/issue-form.component';
import { RolePageComponent } from './components/role-page/role-page.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RolesModule } from './modules/roles/roles.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IssuesPageComponent,
    NavbarComponent,
    IssueFormComponent,
    RolePageComponent,
    RoleFormComponent,
    UserPageComponent,
    UserFormComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
    RolesModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
