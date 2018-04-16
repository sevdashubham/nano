import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNoteDialogComponent } from './dialog-note-dialog.component';

describe('DialogNoteDialogComponent', () => {
  let component: DialogNoteDialogComponent;
  let fixture: ComponentFixture<DialogNoteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNoteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
