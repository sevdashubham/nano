import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {AuthenticationService} from "../authentication.service";
import {NoteModel} from "../models/note.model";
import {DataService} from "../data.service";
import {LabelModel} from "../models/label.model";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  currentNote = null;
  titleMaxLength = 100;
  abelMaxLength = 20;
  noteModels: NoteModel[] = [];
  labels: Array<string> = [];
  labelModel = new LabelModel();
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
    this.getLabels();
  }

  getNotes() {
    this.dataService.getNotes().subscribe(
      res => {
        console.log(JSON.stringify(res));
        this.noteModels = res;
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }

  getLabels() {
    console.log('yaha tak aaayaa3');
    this.dataService.getLabels().subscribe(res => {
        console.log(JSON.stringify(res));
        this.labelModel = res;
        // this.addLabel();
      // this.removeLabel();
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }
  addLabel(){
    this.dataService.addLabel(this.labelModel.labels[2]).subscribe(res => {
        console.log(JSON.stringify(res));
        // this.labelModel = res;
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }
  removeLabel() {
    this.dataService.removeLabel(this.labelModel.labels[3]).subscribe(res => {
        console.log(JSON.stringify(res));
        // this.labelModel = res;
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
        // this.deleteNode();
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }

  updateNote() {
    this.noteModels[0].title = 'faaltu';
    // this.note.title = 'updatedttile';
    // this.note.title = 'aaabebebebeaaaa';
    // this.note.content = '<p>bcbcbbcbccbcbc.</p>';
    // this.note.dateCreated = this.getCurrentDate();
    // this.note.labels = ['Personal', 'Miscellaneous'];
    // this.note.colorClass = 'color4';
    // this.note.isArchived = false;
    // this.note.isTrashed = false;
    // this.note.timestamp = Math.floor(Date.now() / 1000) + 0;
    this.dataService.updateNode(this.noteModels[0]).subscribe(res => {
        // let id = res['_id'];
        // this.router.navigate(['/notes']);
        console.log(JSON.stringify(res));
        console.log('yaha tak aaayaahua update');
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }

  deleteNode() {
    this.dataService.deleteNode(this.noteModels[3]).subscribe(res => {
        // let id = res['_id'];
        // this.router.navigate(['/notes']);
        console.log(JSON.stringify(res));
        console.log('yaha tak aaayaahua delete');
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
