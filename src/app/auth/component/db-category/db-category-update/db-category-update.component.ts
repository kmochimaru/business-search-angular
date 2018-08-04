import { AppURL } from './../../../../app.url';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../shared/category.service';
import { HttpClient } from '@angular/common/http';
import { ProvinceService } from './../../../../shareds/province.service';
import { Component, Optional, Inject, ViewChild } from '@angular/core';
import { Category } from '../shared/category';

@Component({
  selector: 'app-db-category-update',
  templateUrl: './db-category-update.component.html',
  styleUrls: ['./db-category-update.component.css']
})
export class DbCategoryUpdateComponent {

  AppURL = AppURL;
  public provinces: any;
  public provinceSelected: any;
  public categoryImage: File = null;
  public category: Category;
  public deleteImage: string;
  public currentImage: string;
  public previewHide = true;
  @ViewChild('preview') preview;

  constructor(private _categoryService: CategoryService,
    private _toastrService: ToastrService,
    private _provinceService: ProvinceService,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<DbCategoryUpdateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.provinces = data[0];
    this.category = <Category>data[1];
    this.currentImage = AppURL.Img + this.category.category_img;
    this.deleteImage = this.category.category_img;
  }

  onImageSelected(event) {
    this.categoryImage = <File>event.target.files[0];

    // Preview
    this.previewHide = false;
    const canvas = this.preview.nativeElement;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 300, 300);
    const render = new FileReader();
    render.onload = function (ev) {
      const img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
      };
      img.src = render.result;
    };
    render.readAsDataURL(event.target.files[0]);

  }

  onSubmit() {
    if (this.previewHide === false) {
      const fd = new FormData();
      fd.append('file', this.categoryImage, this.categoryImage.name);
      this._http.post(AppURL.Upload, fd).subscribe( // Upload Image
        response => {
          this.category.category_img = `${response}`;
          this._categoryService.update(this.category).subscribe(  // Update column category_img
            data => {
              if (data != null && data !== false) {
                this._http.get(`${AppURL.Remove}?image_name=${this.deleteImage}`).subscribe(  // Delete Image
                  image => { this._toastrService.success(this.category.category_name, 'แก้ไขหมวดหมู่สำเร็จ.'); },
                  err => { this._toastrService.error(err, 'ลบรูปภาพล้มเหลว.'); }
                );
              }
            },
            err => { this._toastrService.error(err, 'แก้ไขหมวดหมู่ล้มเหลว'); }
          );
        },
        err => { this._toastrService.error(err, 'อัพโหลดรูปภาพไม่สำเร็จ.'); }
      );
    } else {
      this._categoryService.update(this.category).subscribe(
        data => { this._toastrService.success(this.category.category_name, 'แก้ไขหมวดหมู่สำเร็จ.'); },
        err => { this._toastrService.error(err, 'แก้ไขหมวดหมู่ล้มเหลว'); }
      );
    }
    this._dialogRef.close();
  }
}
