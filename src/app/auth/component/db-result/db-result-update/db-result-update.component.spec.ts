import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbResultUpdateComponent } from './db-result-update.component';

describe('DbResultUpdateComponent', () => {
  let component: DbResultUpdateComponent;
  let fixture: ComponentFixture<DbResultUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbResultUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbResultUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
