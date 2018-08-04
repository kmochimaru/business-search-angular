import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbResultCreateComponent } from './db-result-create.component';

describe('DbResultCreateComponent', () => {
  let component: DbResultCreateComponent;
  let fixture: ComponentFixture<DbResultCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbResultCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbResultCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
