import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import dayjs from 'dayjs';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CowService } from '../../services/cow.service';
import { Cow } from '../../models/cow.model';

@Component({
  selector: 'app-add-cow',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-cow.component.html'
})
export class AddCowComponent {
  private fb = inject(FormBuilder);
  private cowService = inject(CowService);
  private router = inject(Router);

  errorMessage = '';

  form = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(2)]],
    sex: ['', Validators.required],
    pen: ['', Validators.required],
    status: ['Active', Validators.required],
    weight: [null as number | null, [Validators.min(0.1)]]
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const val = this.form.value;
    const tagId = val.id!.trim();

    if (!this.cowService.isTagUnique(tagId)) {
      this.errorMessage = `Ear tag "${tagId}" already exists. Please use a unique tag.`;
      return;
    }

    const newCow: Cow = {
      id: tagId,
      sex: val.sex as 'Male' | 'Female',
      pen: val.pen!.trim(),
      status: val.status as 'Active' | 'In Treatment' | 'Deceased',
      lastEventDate: dayjs().format('YYYY-MM-DD'),
      weight: val.weight ?? undefined,
      events: [
        {
          date: dayjs().format('YYYY-MM-DD'),
          type: 'Registered',
          description: 'Cow added to the catalog.'
        }
      ]
    };

    this.cowService.addCow(newCow);
    this.router.navigate(['/cows']);
  }

  cancel(): void {
    this.router.navigate(['/cows']);
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }
}
