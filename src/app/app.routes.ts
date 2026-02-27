import { Routes } from '@angular/router';
import { CowListComponent } from './components/cow-list/cow-list.component';
import { CowDetailComponent } from './components/cow-detail/cow-detail.component';
import { AddCowComponent } from './components/add-cow/add-cow.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cows', pathMatch: 'full' },
  { path: 'cows', component: CowListComponent },
  { path: 'cows/add', component: AddCowComponent },
  { path: 'cows/:id', component: CowDetailComponent },
  { path: '**', redirectTo: 'cows' }
];
