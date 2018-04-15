import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {NoteModel} from "./models/note.model";

@Injectable()
export class DataService {
  private token: string;
  constructor(private http: HttpClient, private router: Router) {}

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }
  public getLabels(): Observable<any>{
    return this.http.get('/api/getlabels', { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }
  public getNotes(): Observable<any>{
    return this.http.get('/api/getnotes', { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }
  public addNote(note): Observable<any> {
  return this.http.post('/api/addnote',note, { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }
 public updateNode(note): Observable<any> {
    return this.http.put('api/updatenote', note, { headers: { Authorization: `Bearer ${this.getToken()}` }})
 }
 public deleteNode(note): Observable<any> {
    return this.http.delete('/api/deletenote/' + note._id,{ headers: { Authorization: `Bearer ${this.getToken()}` }})
 }
  public addLabel(label) {
    return this.http.get('/api/addlabel/' + label,  { headers: { Authorization: `Bearer ${this.getToken()}` }});
  };

  public removeLabel(label) {
    return this.http.delete('/api/deletelabel/' + label, { headers: { Authorization: `Bearer ${this.getToken()}` }})
  };
}
