import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-dialogx',
  templateUrl: './dialogx.component.html',
  styleUrls: ['./dialogx.component.css']
})
export class DialogxComponent implements OnInit {
  constructor(
    // public dialogRef: MatDialogRef<DialogxComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  ngOnInit() {
  }

}
