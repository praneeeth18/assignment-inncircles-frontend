import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrl: './issue-form.component.css'
})
export class IssueFormComponent implements OnInit {
  @Input() issue?: any; 
  @Output() close = new EventEmitter<void>(); 
  issueForm: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private issuesService: IssuesService) {
    this.issueForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      status: ['OPEN', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.issue) {
      this.isEditMode = true;
      this.issueForm.patchValue(this.issue);
    }
  }

  ngOnChanges(): void {
    if (this.issue) {
      this.isEditMode = true;
      this.issueForm.patchValue(this.issue);
    } else {
      this.isEditMode = false;
      this.issueForm.reset();
    }
  }

  onSubmit(): void {
    if (this.issueForm.valid) {
      if (this.isEditMode) {
        this.issuesService.updateIssue(this.issue!._id, this.issueForm.value).subscribe({
          next: () => {
            alert('Issue updated successfully!');
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating issue:', error);
          }
        });
      } else {
        this.issuesService.createIssue(this.issueForm.value).subscribe({
          next: () => {
            alert('Issue created successfully!');
            this.resetForm();
          },
          error: (error) => {
            console.error('Error creating issue:', error);
          }
        });
      }
    }
  }

  resetForm(): void {
    this.issueForm.reset();
    this.isEditMode = false;
    this.close.emit(); 
  }
}

