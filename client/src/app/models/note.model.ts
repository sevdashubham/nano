export class NoteModel{
  constructor(){}
  _id: string;
  title: string;
  content: string;
  dateCreated: string;
  labels: [string];
  colorClass: string;
  isArchived: boolean;
  isTrashed: boolean;
  timestamp: number;
  author: string;
}
