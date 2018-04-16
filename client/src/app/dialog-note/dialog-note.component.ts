import { Component } from '@angular/core';
import {MatDialog} from "@angular/material";
import {DialogNoteDialogComponent} from "../dialog-note-dialog/dialog-note-dialog.component";


@Component({
  selector: 'app-dialog-note',
  templateUrl: './dialog-note.component.html',
  styleUrls: ['./dialog-note.component.css']
})
export class DialogNoteComponent {
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogNoteDialogComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
