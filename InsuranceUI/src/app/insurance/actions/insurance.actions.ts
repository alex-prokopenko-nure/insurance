import { createAction, props } from '@ngrx/store';

const LOAD_ALL_CASES = '[Insurance] Load All Cases';
const LOAD_ALL_CASES_SUCCESS = '[Insurance] Load All Cases Success';
const LOAD_ALL_CASES_ERROR = '[Insurance] Load All Cases Error';
const CREATE_CASE = '[Insurance] Create Case';
const CREATE_CASE_SUCCESS = '[Insurance] Create Case Success';
const CREATE_CASE_ERROR = '[Insurance] Create Case Error';
const UPDATE_CASE = '[Insurance] Update Case';
const UPDATE_CASE_SUCCESS = '[Insurance] Update Case Success';
const UPDATE_CASE_ERROR = '[Insurance] Update Case Error';
const DELETE_CASE = '[Insurance] Delete Case';
const DELETE_CASE_SUCCESS = '[Insurance] Delete Case Success';
const DELETE_CASE_ERROR = '[Insurance] Delete Case Error';
const SELECT_CASE = '[Insurance] Select Case';
const CLEAR_CASE = '[Insurance] Clear Case';

export const loadAllCases = createAction(LOAD_ALL_CASES);
export const loadAllCasesSuccess = createAction(LOAD_ALL_CASES_SUCCESS, props<{ cases: any[] }>());
export const loadAllCasesError = createAction(LOAD_ALL_CASES_ERROR, props<{ error: any }>());
export const createCase = createAction(CREATE_CASE, props<{ caseModel: any }>());
export const createCaseSuccess = createAction(CREATE_CASE_SUCCESS, props<{ caseModel: any }>());
export const createCaseError = createAction(CREATE_CASE_ERROR, props<{ error: any }>());
export const updateCase = createAction(UPDATE_CASE, props<{ id: string, caseModel: any }>());
export const updateCaseSuccess = createAction(UPDATE_CASE_SUCCESS, props<{ caseModel: any }>());
export const updateCaseError = createAction(UPDATE_CASE_ERROR, props<{ error: any }>());
export const deleteCase = createAction(DELETE_CASE, props<{ id: string }>());
export const deleteCaseSuccess = createAction(DELETE_CASE_SUCCESS, props<{ id: string }>());
export const deleteCaseError = createAction(DELETE_CASE_ERROR, props<{ error: any }>());
export const selectCase = createAction(SELECT_CASE, props<{ id: string }>());
export const clearCase = createAction(CLEAR_CASE);

export const InsuranceActionTypes = {
  LOAD_ALL_CASES,
  LOAD_ALL_CASES_SUCCESS,
  LOAD_ALL_CASES_ERROR,
  CREATE_CASE,
  CREATE_CASE_SUCCESS,
  CREATE_CASE_ERROR,
  UPDATE_CASE,
  UPDATE_CASE_SUCCESS,
  UPDATE_CASE_ERROR,
  DELETE_CASE,
  DELETE_CASE_SUCCESS,
  DELETE_CASE_ERROR,
  SELECT_CASE,
  CLEAR_CASE
};

export const InsuranceActions = {
  loadAllCases,
  loadAllCasesSuccess,
  loadAllCasesError,
  createCase,
  createCaseSuccess,
  createCaseError,
  updateCase,
  updateCaseSuccess,
  updateCaseError,
  deleteCase,
  deleteCaseSuccess,
  deleteCaseError,
  selectCase,
  clearCase
};
