import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, switchMap } from 'rxjs/operators';
import { InsuranceApiService } from '../services/insurance.api.service';
import { InsuranceActions } from '../actions/insurance.actions';

@Injectable()
export class ClientEffect {
  constructor(
    private _actions$: Actions,
    private _insuranceApiService: InsuranceApiService
  ) { }

  loadAllCases$ = createEffect(() =>
    this._actions$.pipe(
      ofType(InsuranceActions.loadAllCases),
      mergeMap(() => this._insuranceApiService.loadAllCases$().pipe(
        map(cases => InsuranceActions.loadAllCasesSuccess({ cases })),
        catchError(error => of(InsuranceActions.loadAllCasesError({ error })))
      ))
    )
  );

  createCase$ = createEffect(() =>
    this._actions$.pipe(
      ofType(InsuranceActions.createCase),
      mergeMap(action => this._insuranceApiService.createCase$(action.caseModel).pipe(
        map(caseModel => InsuranceActions.createCaseSuccess({ caseModel })),
        catchError(error => of(InsuranceActions.createCaseError({ error })))
      ))
    )
  );

  updateCase$ = createEffect(() =>
    this._actions$.pipe(
      ofType(InsuranceActions.updateCase),
      mergeMap(action => this._insuranceApiService.updateCase$(action.id, action.caseModel).pipe(
        map(caseModel => InsuranceActions.updateCaseSuccess({ caseModel })),
        catchError(error => of(InsuranceActions.updateCaseError({ error })))
      ))
    )
  );

  deleteCase$ = createEffect(() =>
    this._actions$.pipe(
      ofType(InsuranceActions.deleteCase),
      mergeMap(action => this._insuranceApiService.deleteCase$(action.id).pipe(
        map(() => InsuranceActions.deleteCaseSuccess({ id: action.id })),
        catchError(error => of(InsuranceActions.deleteCaseError({ error })))
      ))
    )
  );
}
