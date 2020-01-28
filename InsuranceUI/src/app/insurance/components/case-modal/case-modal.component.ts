import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { InsuranceService } from '../../services/insurance.service';

@Component({
  selector: 'app-case-modal',
  templateUrl: './case-modal.component.html',
  styleUrls: ['./case-modal.component.scss']
})
export class CaseModalComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<CaseModalComponent>,
    private _insuranceService: InsuranceService
    ) { }

  ngOnInit() {
  }

  
}
