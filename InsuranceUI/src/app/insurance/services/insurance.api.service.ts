import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class InsuranceApiService {
  constructor() {

  }

  loadAllCases$ = () => {
    return of([]);
  }

  createCase$ = (caseModel: any) => {
    return of(caseModel);
  }

  updateCase$ = (id: string, caseModel: any) => {
    return of(caseModel);
  }

  deleteCase$ = (id: string) => {
    return of();
  }
}
