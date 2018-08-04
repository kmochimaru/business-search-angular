import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbResultDeleteComponent } from './db-result-delete.component';

describe('DbResultDeleteComponent', () => {
  let component: DbResultDeleteComponent;
  let fixture: ComponentFixture<DbResultDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbResultDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbResultDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
