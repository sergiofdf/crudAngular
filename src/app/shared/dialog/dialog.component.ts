import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  public title!: string;
  public text!: string;
  public button1!: string;
  public button2!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, text: string, button1: string, button2: string}) {
    this.title = data.title;
    this.text = data.text;
    this.button1 = data.button1;
    this.button2 = data.button2;
  }

  onSubmit() {
    this.dialogRef.close('delete');
    }

}

