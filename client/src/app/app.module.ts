import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatInputModule, MatSnackBarModule} from "@angular/material";
import { NotesComponent } from './notes/notes.component';
import {DataService} from "./data.service";
import {MatCardModule} from '@angular/material/card';
import {SearchFilter} from "./common/searchFilter.pipe";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogNoteComponent } from './dialog-note/dialog-note.component';
import { DialogNoteDialogComponent } from './dialog-note-dialog/dialog-note-dialog.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'note', component: NotesComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LandingPageComponent,
    NotesComponent,
    SearchFilter,
    DialogNoteComponent,
    DialogNoteDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  entryComponents: [
    DialogNoteDialogComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuardService, DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
