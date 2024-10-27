import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueFormComponent } from './issue-form/issue-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssuesRoutingModule } from './issues-routing .module';



@NgModule({
  declarations: [
    IssueFormComponent,
    IssueListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IssuesRoutingModule
  ]
})
export class IssuesModule { }
