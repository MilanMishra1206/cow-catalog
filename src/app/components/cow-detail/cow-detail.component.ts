import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CowService } from '../../services/cow.service';
import { Cow } from '../../models/cow.model';

@Component({
  selector: 'app-cow-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cow-detail.component.html'
})
export class CowDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cowService = inject(CowService);

  cow: Cow | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cow = this.cowService.getCowById(id);
    }
    if (!this.cow) {
      this.router.navigate(['/cows']);
    }
  }

  getEventIcon(type: string): string {
    switch (type) {
      case 'Weight Check': return '⚖️';
      case 'Treatment': return '💊';
      case 'Moved': return '🚚';
      case 'Death': return '🕊️';
      case 'Registered': return '📋';
      default: return '📌';
    }
  }

  goBack(): void {
    this.router.navigate(['/cows']);
  }
}
