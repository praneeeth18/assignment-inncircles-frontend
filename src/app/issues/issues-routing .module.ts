import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueFormComponent } from './issue-form/issue-form.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', component: IssueListComponent, canActivate: [authGuard] },
  { path: 'issue-form', component: IssueFormComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuesRoutingModule { }
