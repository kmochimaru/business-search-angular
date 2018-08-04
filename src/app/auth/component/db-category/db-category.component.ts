import { DbCategoryDeleteComponent } from './db-category-delete/db-category-delete.component';
import { ProvinceService } from './../../../shareds/province.service';
import { DbCategoryCreateComponent } from './db-category-create/db-category-create.component';
import { CategoryService } from './shared/category.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { Category } from './shared/category';
import { DbCategoryUpdateComponent } from './db-category-update/db-category-update.component';

@Component({
  selector: 'app-db-category',
  templateUrl: './db-category.component.html',
  styleUrls: ['./db-category.component.css']
})
export class DbCategoryComponent implements OnInit, AfterViewInit {
  public categories: Category;
  public provinces;
  public filter: '';
  public dataSource = new MatTableDataSource();
  public displayedColumns = ['category_id', 'category_name', 'category_img', 'province_id', 'manage'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _categoryService: CategoryService,
    private _provinceService: ProvinceService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.loadCategory();
    this.loadProvince();
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

  loadCategory() {
    this._categoryService.findAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  loadProvince() {
    this._provinceService.findAll().subscribe(data => {
      this.provinces = data;
    });
  }

  newCategory() {
    const dialogRef = this._dialog.open(DbCategoryCreateComponent, {
      width: '400px',
      data: this.provinces
    }).afterClosed().subscribe(() => {
      this.loadCategory();
    });
  }

  updateCategory(category: Category) {
    const dataArr = [];
    dataArr.push(this.provinces);
    dataArr.push(category);
    const dialogRef = this._dialog.open(DbCategoryUpdateComponent, {
      width: '400px',
      data: dataArr
    }).afterClosed().subscribe(() => {
      this.loadCategory();
    });
  }

  deleteCategory(category_id: number, category_img: string) {
    const dialogRef = this._dialog.open(DbCategoryDeleteComponent, {
      width: '400px',
      data: { id: category_id, image: category_img }
    }).afterClosed().subscribe(() => {
      this.loadCategory();
    });
  }

}
