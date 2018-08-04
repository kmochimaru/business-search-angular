import { CategoryService } from './../db-category/shared/category.service';
import { ResultService } from './shared/result.service';
import { Result } from './shared/result';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { DbResultCreateComponent } from './db-result-create/db-result-create.component';
import { DbResultUpdateComponent } from './db-result-update/db-result-update.component';
import { DbResultDeleteComponent } from './db-result-delete/db-result-delete.component';

@Component({
  selector: 'app-db-result',
  templateUrl: './db-result.component.html',
  styleUrls: ['./db-result.component.css']
})
export class DbResultComponent implements OnInit, AfterViewInit {
  public results: Result;
  public category: any;
  public filter: '';
  public dataSource = new MatTableDataSource();
  public displayedColumns = ['result_id', 'result_name', 'result_img', 'category_id', 'manage'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _resultService: ResultService,
    private _categoryService: CategoryService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.loadResult();
    this.loadCategory();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  loadResult() {
    this._resultService.findAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  loadCategory() {
    this._categoryService.findAll().subscribe(data => {
      this.category = data;
    });
  }

  newResult() {
    const dialogRef = this._dialog.open(DbResultCreateComponent, {
      width: '400px',
      data: this.category
    }).afterClosed().subscribe(() => {
      this.loadResult();
    });
  }

  updateResult(result: Result) {
    const dataArr = [];
    dataArr.push(this.category);
    dataArr.push(result);
    const dialogRef = this._dialog.open(DbResultUpdateComponent, {
      width: '400px',
      data: dataArr
    }).afterClosed().subscribe(() => {
      this.loadResult();
    });
  }

  deleteResult(result_id: number, result_img: string) {
    const dialogRef = this._dialog.open(DbResultDeleteComponent, {
      width: '400px',
      data: { id: result_id, image: result_img }
    }).afterClosed().subscribe(() => {
      this.loadResult();
    });
  }

}
