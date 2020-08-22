import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbysymptomsComponent } from './searchbysymptoms.component';

describe('SearchbysymptomsComponent', () => {
  let component: SearchbysymptomsComponent;
  let fixture: ComponentFixture<SearchbysymptomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchbysymptomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbysymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
