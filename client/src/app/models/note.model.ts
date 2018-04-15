export class NoteModel{
  constructor(){}
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
