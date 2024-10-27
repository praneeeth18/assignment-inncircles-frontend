import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RolesModule } from './roles/roles.module';
import { IssuesModule } from './issues/issues.module';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    UserProfileComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    IssuesModule,
    UsersModule,
    RolesModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
