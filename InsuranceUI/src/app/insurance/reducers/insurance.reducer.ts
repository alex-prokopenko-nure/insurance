import { Action, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { InsuranceActions } from '../actions/insurance.actions';
import { Case, City } from 'src/app/services/insurance.swagger.api.service';

export const featureKey = 'Insurance';

export interface State extends EntityState<Case> {
  selectedCaseId: string;
  error: any;
  cities: City[];
}

export function selectCaseId(a: Case): string {
  return a.id;
}

export function sortByName(a: Case, b: Case): number {
  return a.number.localeCompare(b.number);
}

export const adapter: EntityAdapter<Case> = createEntityAdapter<Case>({
  selectId: selectCaseId,
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  selectedCaseId: '',
  error: undefined,
  cities: []
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
  on(InsuranceActions.loadAllCasesError, (state, action) => ({ ...state, error: action.error })),
  on(InsuranceActions.loadCitiesSuccess, (state, action) => ({ ...state, cities: action.cities })),
  on(InsuranceActions.loadCitiesError, (state, action) => ({ ...state, error: action.error })),
);

export function reducer(state: State, action: Action) {
  return insuranceReducer(state, action);
}

export const selectInsurance = createFeatureSelector<State>(featureKey);
export const selectAllCases = createSelector(selectInsurance, adapter.getSelectors().selectAll);
export const selectCaseEntities = createSelector(selectInsurance, adapter.getSelectors().selectEntities);
export const selectCurrentCaseId = createSelector(selectInsurance, (state: State) => state.selectedCaseId);
export const selectError = createSelector(selectInsurance, (state: State) => state.error);
export const selectCurrentCase = createSelector(selectCaseEntities, selectCurrentCaseId, (caseEntities, caseId) => caseEntities[caseId]);
export const selectCities = createSelector(selectInsurance, (state: State) => state.cities);
