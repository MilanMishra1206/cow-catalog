import { Injectable, signal, computed } from '@angular/core';
import { Cow, CowEvent, CowStatus, CowSex } from '../models/cow.model';
import { FilterState } from '../models/filter-state.model';

const SAMPLE_COWS: Cow[] = [
  {
    id: 'ET-1001',
    sex: 'Female',
    pen: 'Pen A',
    status: 'Active',
    lastEventDate: '2024-05-10',
    weight: 520,
    dailyWeightGain: 1.2,
    events: [
      { date: '2024-05-10', type: 'Weight Check', description: 'Weight recorded at 520 kg.' },
      { date: '2024-04-01', type: 'Moved', description: 'Moved from Pen B to Pen A.' },
      { date: '2024-03-15', type: 'Weight Check', description: 'Weight recorded at 505 kg.' },
    ]
  },
  {
    id: 'ET-1002',
    sex: 'Male',
    pen: 'Pen B',
    status: 'In Treatment',
    lastEventDate: '2024-05-12',
    weight: 610,
    dailyWeightGain: 0.8,
    events: [
      { date: '2024-05-12', type: 'Treatment', description: 'Antibiotic treatment started for respiratory illness.' },
      { date: '2024-04-20', type: 'Weight Check', description: 'Weight recorded at 610 kg.' },
      { date: '2024-03-10', type: 'Moved', description: 'Moved from Pen A to Pen B.' },
    ]
  },
  {
    id: 'ET-1003',
    sex: 'Female',
    pen: 'Pen A',
    status: 'Active',
    lastEventDate: '2024-05-08',
    weight: 480,
    dailyWeightGain: 1.0,
    events: [
      { date: '2024-05-08', type: 'Weight Check', description: 'Weight recorded at 480 kg.' },
      { date: '2024-02-20', type: 'Weight Check', description: 'Weight recorded at 460 kg.' },
    ]
  },
  {
    id: 'ET-1004',
    sex: 'Male',
    pen: 'Pen C',
    status: 'Deceased',
    lastEventDate: '2024-04-30',
    weight: 540,
    events: [
      { date: '2024-04-30', type: 'Death', description: 'Cow passed away due to complications.' },
      { date: '2024-04-25', type: 'Treatment', description: 'Emergency treatment administered.' },
      { date: '2024-04-10', type: 'Weight Check', description: 'Weight recorded at 540 kg.' },
    ]
  },
  {
    id: 'ET-1005',
    sex: 'Female',
    pen: 'Pen B',
    status: 'Active',
    lastEventDate: '2024-05-11',
    weight: 495,
    dailyWeightGain: 1.1,
    events: [
      { date: '2024-05-11', type: 'Weight Check', description: 'Weight recorded at 495 kg.' },
      { date: '2024-03-22', type: 'Moved', description: 'Moved from Pen C to Pen B.' },
    ]
  },
  {
    id: 'ET-1006',
    sex: 'Male',
    pen: 'Pen C',
    status: 'Active',
    lastEventDate: '2024-05-09',
    weight: 630,
    dailyWeightGain: 1.4,
    events: [
      { date: '2024-05-09', type: 'Weight Check', description: 'Weight recorded at 630 kg.' },
      { date: '2024-04-05', type: 'Weight Check', description: 'Weight recorded at 610 kg.' },
    ]
  },
];

@Injectable({ providedIn: 'root' })
export class CowService {
  private _cows = signal<Cow[]>(SAMPLE_COWS);

  private _filters = signal<FilterState>({
    searchTag: '',
    status: '',
    pen: ''
  });

  readonly cows = computed(() => this._cows());

  readonly filters = computed(() => this._filters());

  readonly filteredCows = computed(() => {
    const filters = this._filters();
    return this._cows().filter(cow => {
      const matchesTag = !filters.searchTag ||
        cow.id.toLowerCase().includes(filters.searchTag.toLowerCase());
      const matchesStatus = !filters.status || cow.status === filters.status;
      const matchesPen = !filters.pen || cow.pen === filters.pen;
      return matchesTag && matchesStatus && matchesPen;
    });
  });

  readonly availablePens = computed(() => {
    const pens = this._cows().map(c => c.pen);
    return [...new Set(pens)].sort();
  });

  getCowById(id: string): Cow | undefined {
    return this._cows().find(c => c.id === id);
  }

  addCow(cow: Cow): boolean {
    const exists = this._cows().some(c => c.id === cow.id);
    if (exists) return false;
    this._cows.update(cows => [...cows, cow]);
    return true;
  }

  updateFilters(filters: Partial<FilterState>): void {
    this._filters.update(current => ({ ...current, ...filters }));
  }

  resetFilters(): void {
    this._filters.set({ searchTag: '', status: '', pen: '' });
  }

  isTagUnique(tag: string): boolean {
    return !this._cows().some(c => c.id === tag);
  }
}
