// roles-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolePageComponent } from './role-page/role-page.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', component: RolePageComponent, canActivate: [authGuard], data: { roles: ['Admin'] } }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
