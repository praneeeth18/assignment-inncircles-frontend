import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    UserFormComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
