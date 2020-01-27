import { Action, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { InsuranceActions } from '../actions/insurance.actions';

export const featureKey = 'Insurance';

export interface State extends EntityState<any> {
  selectedCaseId: string;
  error: any;
}

export function selectCaseId(a: any): string {
  return a.id;
}

export function sortByName(a: any, b: any): number {
  return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: selectCaseId,
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  selectedCaseId: '',
  error: undefined
});

const insuranceReducer = createReducer(
  initialState,
  on(InsuranceActions.selectCase, (state, action) => ({ ...state, selectedCaseId: action.id })),
  on(InsuranceActions.clearCase, (state, action) => ({ ...state, selectedCaseId: '' })),
  on(InsuranceActions.createCaseSuccess, (state, action) =>
    adapter.addOne(action.caseModel, state)),
  on(InsuranceActions.updateCaseSuccess, (state, action) =>
    adapter.updateOne({ id: action.caseModel.id, changes: action.caseModel}, state)),
  on(InsuranceActions.deleteCaseSuccess, (state, action) =>
    adapter.removeOne(action.id, state)),
  on(InsuranceActions.loadAllCasesSuccess, (state, action) =>
    adapter.addAll(action.cases, state)),
  on(InsuranceActions.createCaseError, (state, action) => ({ ...state, error: action.error })),
  on(InsuranceActions.updateCaseError, (state, action) => ({ ...state, error: action.error })),
  on(InsuranceActions.deleteCaseError, (state, action) => ({ ...state, error: action.error })),
  on(InsuranceActions.loadAllCasesError, (state, action) => ({ ...state, error: action.error }))
);

export function reducer(state: State, action: Action) {
  return insuranceReducer(state, action);
}

export const selectInsurance = createFeatureSelector<State>(featureKey);
export const selectCaseEntities = createSelector(selectInsurance, adapter.getSelectors().selectEntities);
export const selectCurrentCaseId = createSelector(selectInsurance, (state: State) => state.selectedCaseId);
export const selectError = createSelector(selectInsurance, (state: State) => state.error);
export const selectCurrentCase = createSelector(selectCaseEntities, selectCurrentCaseId, (caseEntities, caseId) => caseEntities[caseId]);
