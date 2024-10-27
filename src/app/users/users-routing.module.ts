import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', component: UserListComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
  { path: 'user-form', component: UserFormComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
