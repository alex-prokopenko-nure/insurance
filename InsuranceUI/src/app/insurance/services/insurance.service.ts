import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromInsurance from '../reducers/insurance.reducer';
import { InsuranceActions } from '../actions/insurance.actions';
import { Case } from 'src/app/services/insurance.swagger.api.service';

@Injectable()
export class InsuranceService {
  constructor(private _store: Store<fromInsurance.State>) {

  }

  get selectedCase$() {
    return this._store.select(fromInsurance.selectCurrentCase);
  }

  get cases$() {
    return this._store.select(fromInsurance.selectAllCases);
  }

  get cities$() {
    return this._store.select(fromInsurance.selectCities);
  }

  get error$() {
    return this._store.select(fromInsurance.selectError);
  }

  loadAllCases = () => {
    this._store.dispatch(InsuranceActions.loadAllCases());
  }

  loadCities = () => {
    this._store.dispatch(InsuranceActions.loadCities());
  }

  createCase = (caseModel: Case) => {
    this._store.dispatch(InsuranceActions.createCase({ caseModel }));
  }

  updateCase = (id: string, caseModel: Case) => {
    this._store.dispatch(InsuranceActions.updateCase({ id, caseModel }));
  }

  deleteCase = (id: string) => {
    this._store.dispatch(InsuranceActions.deleteCase({ id }));
  }

  selectCase = (id: string) => {
    this._store.dispatch(InsuranceActions.selectCase({ id }));
  }

  clearCase = () => {
    this._store.dispatch(InsuranceActions.clearCase());
  }
}
