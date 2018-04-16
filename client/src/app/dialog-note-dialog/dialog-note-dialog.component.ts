import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dialog-note-dialog',
  templateUrl: './dialog-note-dialog.component.html',
  styleUrls: ['./dialog-note-dialog.component.css']
})
export class DialogNoteDialogComponent implements OnInit{
  form: FormGroup;
  title:string;
  content: string;
  temp:{
    title: string;
    content: string;
  };
  constructor(  private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.content = data.content;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.form = this.fb.group({
      description: [this.content, []]
    });
  }

  save() {
    this.temp = {
      title: this.title,
      content: this.content
    };
    this.dialogRef.close(this.temp);
  }

  close() {
    this.dialogRef.close();
  }

}
