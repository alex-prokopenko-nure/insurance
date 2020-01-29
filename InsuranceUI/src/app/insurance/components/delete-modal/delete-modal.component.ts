import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<DeleteModalComponent>,) { }

  ngOnInit() {
  }

  close = (result: boolean) => {
    this._dialogRef.close(result);
  }
}
