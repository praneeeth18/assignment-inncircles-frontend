import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesPageComponent } from './components/roles-page/roles-page.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { RolesFormComponent } from './components/roles-form/roles-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RolesPageComponent,
    RolesListComponent,
    RolesFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RolesModule { }
