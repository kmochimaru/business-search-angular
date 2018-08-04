import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbCategoryUpdateComponent } from './db-category-update.component';

describe('DbCategoryUpdateComponent', () => {
  let component: DbCategoryUpdateComponent;
  let fixture: ComponentFixture<DbCategoryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbCategoryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbCategoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
