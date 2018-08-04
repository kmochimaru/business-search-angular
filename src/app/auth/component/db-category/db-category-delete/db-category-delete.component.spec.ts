import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbCategoryDeleteComponent } from './db-category-delete.component';

describe('DbCategoryDeleteComponent', () => {
  let component: DbCategoryDeleteComponent;
  let fixture: ComponentFixture<DbCategoryDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbCategoryDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbCategoryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
