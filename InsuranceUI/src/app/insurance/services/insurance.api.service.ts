import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { InsuranceSwaggerApiService } from 'src/app/services/insurance.swagger.api.service';

@Injectable()
export class InsuranceApiService {
  constructor(private _swaggerApiService: InsuranceSwaggerApiService) {

  }

  loadAllCases$ = () => {
    return this._swaggerApiService.getAll();
  }

  loadCities$ = () => {
    return this._swaggerApiService.getCities();
  }

  createCase$ = (caseModel: any) => {
    return this._swaggerApiService.post(caseModel);
  }

  updateCase$ = (id: string, caseModel: any) => {
    return this._swaggerApiService.patch(id, caseModel);
  }

  deleteCase$ = (id: string) => {
    return this._swaggerApiService.delete(id);
  }
}
