import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IssuesPageComponent } from './components/issues-page/issues-page.component';
import { authGuard } from './guards/auth.guard';
import { IssueFormComponent } from './components/issue-form/issue-form.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RolesPageComponent } from './modules/roles/components/roles-page/roles-page.component';

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'issues', component: IssuesPageComponent, canActivate: [authGuard] }, 
  // { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  // { path: '**', redirectTo: '/login' }
  { path: 'issues', component: IssuesPageComponent },
  { path: 'issue-form', component: IssueFormComponent },
  { path: 'users', component: UserPageComponent },
  { path: 'user-form', component: UserFormComponent },
  { path: 'profile', component: UserProfileComponent},
  { path: 'roles', component: RolesPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
