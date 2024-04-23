import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorSummernoteComponent } from './editor-summernote.component';

describe('EditorSummernoteComponent', () => {
  let component: EditorSummernoteComponent;
  let fixture: ComponentFixture<EditorSummernoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorSummernoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorSummernoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
