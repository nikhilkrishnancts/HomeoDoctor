import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetPadComponent } from './alphabet-pad.component';

describe('AlphabetPadComponent', () => {
  let component: AlphabetPadComponent;
  let fixture: ComponentFixture<AlphabetPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphabetPadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabetPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
