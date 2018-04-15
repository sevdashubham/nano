import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {AuthenticationService} from "../authentication.service";
import {NoteModel} from "../models/note.model";
import {DataService} from "../data.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  currentNote = null;
  titleMaxLength = 100;
  abelMaxLength = 20;
  note = {
    title: '',
    content: '',
    dateCreated: '',
    labels: [],
    colorClass: '',
    isArchived: false,
    isTrashed: false,
    timestamp: 0,
    author: ''
  };
  constructor(private dataService: DataService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getNotes();

  }

  getNotes() {
    this.dataService.getNotes().subscribe(
      res => {
        console.log(JSON.stringify(res));
        this.addNote();
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }
  addNote() {
    this.note.title = 'aaaaaaa';
   this.note.content = '<p>bcbcbbcbccbcbc.</p>';
    this.note.dateCreated = this.getCurrentDate();
    this.note.labels = ['Personal', 'Miscellaneous'];
    this.note.colorClass = 'color4';
    this.note.isArchived = false;
    this.note.isTrashed = false;
    this.note.timestamp = Math.floor(Date.now() / 1000) + 0;
    console.log('yaha tak aaayaa1');
    this.dataService.addNote(this.note).subscribe(res => {
        // let id = res['_id'];
        // this.router.navigate(['/notes']);
        console.log(JSON.stringify(res));
        console.log('yaha tak aaayaa2');
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, ' OK ', {
      duration: 2500
    });
  }
  public getCurrentDate() {

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = new Date();
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  };
}
