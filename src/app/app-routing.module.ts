import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { RolePageComponent } from './roles/role-page/role-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [authGuard] },
  { path: 'issues', loadChildren: () => import('./issues/issues.module').then(m => m.IssuesModule), canActivate: [authGuard] },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate: [authGuard], data: { roles: ['Admin'] }},
  { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule), canActivate: [authGuard], data: { roles: ['Admin'] }},
  { path: 'users', component: UserListComponent, canActivate: [authGuard], data: { roles: ['Admin'] }},
  { path: 'user-form', component: UserFormComponent, canActivate: [authGuard], data: { roles: ['Admin'] }},
  { path: 'roles', component: RolePageComponent, canActivate: [authGuard], data: { roles: ['Admin'] }},
  { path: 'not-found', component: NotfoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
