import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbCategoryComponent } from './db-category.component';

describe('DbCategoryComponent', () => {
  let component: DbCategoryComponent;
  let fixture: ComponentFixture<DbCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
