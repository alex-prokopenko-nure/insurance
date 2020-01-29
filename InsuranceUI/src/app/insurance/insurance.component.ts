import { Component, OnInit, OnDestroy } from '@angular/core';
import { InsuranceService } from './services/insurance.service';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Case, City } from '../services/insurance.swagger.api.service';
import { Subscription } from 'rxjs';
import { CaseModalComponent } from './components/case-modal/case-modal.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit, OnDestroy {
  cases: MatTableDataSource<Case>;
  casesData: Case[];
  cities: City[];
  subscriptions$: Subscription;

  displayedColumns = [
    'number',
    'holder',
    'date',
    'damageAmount'
  ];

  constructor(
    private _insuranceService: InsuranceService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this._insuranceService.loadAllCases();
    this._insuranceService.loadCities();

    this.subscriptions$ = this._insuranceService.cases$.subscribe(
      cases => {
        this.casesData = cases;
        this.cases = new MatTableDataSource<Case>(this.casesData);
      }
    );

    this.subscriptions$.add(
      this._insuranceService.error$.subscribe(
        error => {
          if (error) {
            this._snackBar.open(error, 'OK', { duration: 7000 });
          }
        }
      )
    );

    this.subscriptions$.add(
      this._insuranceService.cities$.subscribe(
        cities => {
          this.cities = cities;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }

  getHolderInfo = (caseModel: Case) => {
    const name = caseModel.holder.name;
    const address = caseModel.holder.address;
    const city = this.cities.find(x => x.id == address.cityId);
    const addressString = `${address.street} ${address.streetNumber}, ${city ? city.name : 'Unknown'}, ${address.postalCode}`;
    return `${name}, ${addressString}`;
  }

  getCaseDamage = (caseModel: Case) => {
    let sum = 0;
    
    for (let i = 0; i < caseModel.damages.length; ++i) {
      sum += caseModel.damages[i].amount;
    }

    return sum;
  }

  addCase = () => {
    const dialogRef = this._dialog.open(CaseModalComponent);
  }

  editCase = (id: string) => {
    this._insuranceService.selectCase(id);
    const dialogRef = this._dialog.open(CaseModalComponent);
    dialogRef.afterClosed().subscribe(
      () => {
        this._insuranceService.clearCase();
      }
    );
  }
}
