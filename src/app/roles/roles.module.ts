import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleFormComponent } from './role-form/role-form.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RolePageComponent } from './role-page/role-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RolesRoutingModule } from './roles-routing.module';



@NgModule({
  declarations: [
    RoleFormComponent,
    RoleListComponent,
    RolePageComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
