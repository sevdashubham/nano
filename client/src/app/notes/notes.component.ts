import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatSidenav, MatSnackBar} from "@angular/material";
import {AuthenticationService} from "../authentication.service";
import {NoteModel} from "../models/note.model";
import {DataService} from "../data.service";
import {LabelModel} from "../models/label.model";
import {DialogNoteComponent} from "../dialog-note/dialog-note.component";
import {DialogNoteDialogComponent} from "../dialog-note-dialog/dialog-note-dialog.component";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  noteShort:{
    title: string;
    content: string;
  };
  isAddLabel = false;
  sideBarBoolean = false;
  searchText;
  integer = 0;
  isViewLoaded = false;
  newString;
  currentNote = null;
  titleMaxLength = 100;
  abelMaxLength = 20;
  noteModels: NoteModel[] = [];
  labels: Array<string> = [];
  labelModel = new LabelModel();
  newWord ='';
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

  constructor(private dataService: DataService, public snackBar: MatSnackBar, private dialog: MatDialog,
              private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.getNotes();
  }

  public toggleSideNav(): void {
    this.sidenav.toggle();
  }

  getNotes() {
    this.dataService.getNotes().subscribe(
      res => {
        console.log(JSON.stringify(res));
        this.noteModels = res;
        this.getLabels();
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }

  getLabels() {
    this.dataService.getLabels().subscribe(res => {
        console.log(JSON.stringify(res));
        this.labelModel = res;
        this.sideBarBoolean = true;
        this.isViewLoaded = true;
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }

  addLabel() {
    // console.log(this.integer);
    this.labelModel.labels.length = 0;
    this.labelModel.labels.push(this.newWord);
    this.sideBarBoolean = false;
    this.dataService.addLabel( this.labelModel.labels[0]).subscribe(res => {
        console.log(JSON.stringify(res));
        this.isAddLabel = false;
        this.newWord = '';
        this.getLabels();
        // this.labelModel = res;
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }

  removeLabel(index) {
    console.log(JSON.stringify(this.labelModel.labels[index]));
    this.sideBarBoolean = false;
    this.dataService.removeLabel(this.labelModel.labels[index]).subscribe(res => {
        console.log(JSON.stringify(res));
        this.getLabels();
        // this.labelModel = res;
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }

  addNote() {
    this.note.title = 'What is Lorem Ipsum?';
    this.note.content = 'scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets';
    this.note.dateCreated = this.getCurrentDate();
    this.note.labels = ['Personal', 'Miscellaneous'];
    this.note.colorClass = 'color4';
    this.note.isArchived = false;
    this.note.isTrashed = false;
    this.note.timestamp = Math.floor(Date.now() / 1000) + 0;
    console.log('yaha tak aaayaa1');
    this.isViewLoaded = false;
    this.dataService.addNote(this.note).subscribe(res => {
        // let id = res['_id'];
        // this.router.navigate(['/notes']);
        console.log(JSON.stringify(res));
        console.log('yaha tak aaayaa2');
        this.getNotes();
        // this.deleteNode();
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }

  updateNote(int: number) {
    this.isViewLoaded = false;
    this.noteModels[int].title = this.noteShort.title;
    this.noteModels[int].content = this.noteShort.content;
    // this.note.title = 'updatedttile';
    // this.note.title = 'aaabebebebeaaaa';
    // this.note.content = '<p>bcbcbbcbccbcbc.</p>';
    // this.note.dateCreated = this.getCurrentDate();
    // this.note.labels = ['Personal', 'Miscellaneous'];
    // this.note.colorClass = 'color4';
    // this.note.isArchived = false;
    // this.note.isTrashed = false;
    // this.note.timestamp = Math.floor(Date.now() / 1000) + 0;
    this.dataService.updateNode(this.noteModels[int]).subscribe(res => {
        // let id = res['_id'];
        // this.router.navigate(['/notes']);
      this.getNotes();
        console.log(JSON.stringify(res));
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }

  deleteNote(index: number) {
    this.isViewLoaded = false;
    this.dataService.deleteNode(this.noteModels[index]).subscribe(res => {
        // let id = res['_id'];
        // this.router.navigate(['/notes']);
        console.log(JSON.stringify(res));
      this.getNotes();
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }
  openDialog(i: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.data = {
      title: this.noteModels[i].title,
      content: this.noteModels[i].content
    };

    const dialogRef = this.dialog.open(DialogNoteDialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      (data)=> {
        this.noteShort = data;
        if (this.noteShort !== null) {
          this.updateNote(i)
    }
        console.log("Dialog output:", this.noteShort)
      }
    );

  }
  openSnackBar(message: string) {
    this.snackBar.open(message, ' OK ', {
      duration: 2500
    });
  }
  addLabelBoolean() {
    this.isAddLabel = !this.isAddLabel;
  }

  public getCurrentDate() {

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = new Date();
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  };
}
