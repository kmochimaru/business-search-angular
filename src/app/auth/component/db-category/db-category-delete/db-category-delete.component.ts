import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from './../shared/category.service';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-db-category-delete',
  templateUrl: './db-category-delete.component.html',
  styleUrls: ['./db-category-delete.component.css']
})
export class DbCategoryDeleteComponent {

  public category_id = null;
  public category_img = '';

  constructor(private _categoryService: CategoryService,
    private _toastrService: ToastrService,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<DbCategoryDeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.category_id = data.id;
    this.category_img = data.image;
  }

  onSubmit() {
    this._categoryService.delete(this.category_id, this.category_img).subscribe(
      response => {
        if (response === 1) {
          this._toastrService.success('ลบหมวดหมู่สำเร็จ');
        } else {
          this._toastrService.error('ลบหมวดหมู่ไม่สำเร็จ');
        }
      }
    );

    this._dialogRef.close();
  }

}
