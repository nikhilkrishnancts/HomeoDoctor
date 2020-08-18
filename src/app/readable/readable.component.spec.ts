import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadableComponent } from './readable.component';

describe('ReadableComponent', () => {
  let component: ReadableComponent;
  let fixture: ComponentFixture<ReadableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
