import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbCategoryCreateComponent } from './db-category-create.component';

describe('DbCategoryCreateComponent', () => {
  let component: DbCategoryCreateComponent;
  let fixture: ComponentFixture<DbCategoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbCategoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
