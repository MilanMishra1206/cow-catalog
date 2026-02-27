import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CowService } from '../../services/cow.service';
import { Cow } from '../../models/cow.model';

@Component({
  selector: 'app-cow-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cow-list.component.html'
})
export class CowListComponent implements OnInit {
  private cowService = inject(CowService);
  private router = inject(Router);

  readonly cows = this.cowService.filteredCows;
  readonly availablePens = this.cowService.availablePens;
  readonly filters = this.cowService.filters;

  searchTag = '';
  selectedStatus = '';
  selectedPen = '';

  ngOnInit(): void {
    const f = this.filters();
    this.searchTag = f.searchTag;
    this.selectedStatus = f.status;
    this.selectedPen = f.pen;
  }

  onSearchChange(): void {
    this.cowService.updateFilters({ searchTag: this.searchTag });
  }

  onStatusChange(): void {
    this.cowService.updateFilters({ status: this.selectedStatus });
  }

  onPenChange(): void {
    this.cowService.updateFilters({ pen: this.selectedPen });
  }

  resetFilters(): void {
    this.searchTag = '';
    this.selectedStatus = '';
    this.selectedPen = '';
    this.cowService.resetFilters();
  }

  goToDetail(cow: Cow): void {
    this.router.navigate(['/cows', cow.id]);
  }

  goToAdd(): void {
    this.router.navigate(['/cows/add']);
  }
}
