import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbResultComponent } from './db-result.component';

describe('DbResultComponent', () => {
  let component: DbResultComponent;
  let fixture: ComponentFixture<DbResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
