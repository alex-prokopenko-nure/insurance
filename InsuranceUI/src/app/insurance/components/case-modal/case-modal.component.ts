import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { InsuranceService } from '../../services/insurance.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Case, City } from 'src/app/services/insurance.swagger.api.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-case-modal',
  templateUrl: './case-modal.component.html',
  styleUrls: ['./case-modal.component.scss']
})
export class CaseModalComponent implements OnInit {
  editMode = false;
  caseModel: Case = { };
  caseForm: FormGroup;
  saveClicked = false;
  cities: City[];
  subscription$: Subscription;
  types = [
    'Dent in the hood',
    'Cracked headlight',
    'Broken windshield',
    'Dent in the door'
  ];

  constructor(
    private _dialogRef: MatDialogRef<CaseModalComponent>,
    private _insuranceService: InsuranceService,
    private _builder: FormBuilder,
    private _dialog: MatDialog
    ) { }

  ngOnInit() {
    this.caseForm = this._builder.group({
      number: ['', Validators.required],
      initials: ['', Validators.required],
      name: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      date: ['', Validators.required],
      damages: this._builder.array([ this.createDamage() ])
    });

    this.subscription$ = this._insuranceService.selectedCase$.subscribe(
      caseModel => {
        if (caseModel) {
          this.editMode = true;
          this.caseModel = caseModel;
          this.fillForm(caseModel);
        }
      }
    )

    this.subscription$.add(
      this._insuranceService.cities$.subscribe(
        cities => {
          this.cities = cities;
        }
      )
    );
  }

  createDamage = () => {
    return this._builder.group({
      type: ['', Validators.required],
      amount: ['', Validators.required]
    })
  }

  addDamage = () => {
    const damages = this.caseForm.controls.damages as FormArray;
    damages.push(this.createDamage());
  }

  removeDamage = (i: number) => {
    const damages = this.caseForm.controls.damages as FormArray;
    damages.removeAt(i);
  }

  fillForm = (caseModel: Case) => {
    this.caseForm.controls.number.setValue(caseModel.number);
    this.caseForm.controls.initials.setValue(caseModel.holder.initials);
    this.caseForm.controls.name.setValue(caseModel.holder.name);
    this.caseForm.controls.street.setValue(caseModel.holder.address.street);
    this.caseForm.controls.streetNumber.setValue(caseModel.holder.address.streetNumber);
    this.caseForm.controls.city.setValue(caseModel.holder.address.cityId);
    this.caseForm.controls.postalCode.setValue(caseModel.holder.address.postalCode);
    this.caseForm.controls.date.setValue(caseModel.date);
    const damages = this.caseForm.controls.damages as FormArray;
    damages.clear();
    for (let damage of caseModel.damages) {
      const damageControl = this.createDamage();
      damageControl.controls.type.setValue(damage.type);
      damageControl.controls.amount.setValue(damage.amount);
      damages.push(damageControl);
    }
  } 
  
  close = () => {
    this._dialogRef.close();
  }

  saveCase = () => {
    this.saveClicked = true;
    const value = this.caseForm.value;
    this.caseModel.number = value.number;
    this.caseModel.holder = {
      initials: value.initials,
      name: value.name,
      address: {
        street: value.street,
        streetNumber: +value.streetNumber,
        cityId: value.city,
        postalCode: value.postalCode
      }
    };
    this.caseModel.date = value.date;
    this.caseModel.damages = [];
    for (let damage of value.damages) {
      this.caseModel.damages.push({
        type: damage.type,
        amount: +damage.amount
      })
    }
    if (this.editMode) {
      this._insuranceService.updateCase(this.caseModel.id, this.caseModel);
    } else {
      this._insuranceService.createCase(this.caseModel);
    }

    this._dialogRef.close();
    this.saveClicked = false;
  }

  deleteCase = () => {
    const dialogRef = this._dialog.open(DeleteModalComponent);
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this._insuranceService.deleteCase(this.caseModel.id);
          this._dialogRef.close();
        }
      }
    )
  }
}
