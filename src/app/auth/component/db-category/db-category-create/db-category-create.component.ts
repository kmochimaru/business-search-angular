import { AppURL } from './../../../../app.url';
import { HttpClient } from '@angular/common/http';
import { ProvinceService } from './../../../../shareds/province.service';
import { CategoryService } from './../shared/category.service';
import { Component, Inject, Optional } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Category } from '../shared/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-db-category-create',
  templateUrl: './db-category-create.component.html',
  styleUrls: ['./db-category-create.component.css']
})
export class DbCategoryCreateComponent {

  AppURL = AppURL;
  public category = new Category();
  public categoryImage: File = null;
  public provinces: any;
  public provinceSelected: any;
  public categoryNameFormControl = new FormControl('', [Validators.required]);
  public categoryImgFormControl = new FormControl('', [Validators.required]);
  public provinceIdFormControl = new FormControl('', [Validators.required]);
  public matcher = new MyErrorStateMatcher();

  constructor(private _categoryService: CategoryService,
    private _toastrService: ToastrService,
    private _provinceService: ProvinceService,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<DbCategoryCreateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.provinces = data;
  }

  onImageSelected(event) {
    this.categoryImage = <File>event.target.files[0];
  }

  onSubmit() {
    const fd = new FormData();
    fd.append('file', this.categoryImage, this.categoryImage.name);

    // if (this.categoryNameFormControl.valid &&
    //   this.categoryImgFormControl.valid &&
    //   this.provinceIdFormControl.valid) {
    this._http.post(AppURL.Upload, fd)
      .subscribe(
        response => {
          this.category.category_img = `${response}`;
          this._categoryService.create(this.category).subscribe(
            data => {
              if (data != null && data !== false) {
                this._toastrService.success(this.category.category_name, 'เพิ่มหมวดหมู่สำเร็จ.');
              }
            },
            err => { this._toastrService.error(err, 'เพิ่มหมวดหมู่ล้มเหลว'); }
          );
        },
        err => { this._toastrService.error(err, 'อัพโหลดรูปภาพไม่สำเร็จ.'); }
      );

    this._dialogRef.close();
    // } else {
    //   this._toastrService.error('Please check the information again.', 'Field Required');
    // }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
