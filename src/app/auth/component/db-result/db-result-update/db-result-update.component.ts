import { CategoryService } from './../../db-category/shared/category.service';
import { AppURL } from './../../../../app.url';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResultService } from './../shared/result.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Result } from './../shared/result';
import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';

@Component({
  selector: 'app-db-result-update',
  templateUrl: './db-result-update.component.html',
  styleUrls: ['./db-result-update.component.css']
})
export class DbResultUpdateComponent {

  AppURL = AppURL;
  public categories: any;
  public provinceSelected: any;
  public resultImage: File = null;
  public result: Result;
  public deleteImage: string;
  public currentImage: string;
  public previewHide = true;
  @ViewChild('preview') preview;


  constructor(private _resultService: ResultService,
    private _toastrService: ToastrService,
    private _categoryService: CategoryService,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<DbResultUpdateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.categories = data[0];
    this.result = <Result>data[1];
    this.currentImage = AppURL.Img + this.result.result_img;
    this.deleteImage = this.result.result_img;
  }


  onImageSelected(event) {
    this.resultImage = <File>event.target.files[0];

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
      fd.append('file', this.resultImage, this.resultImage.name);
      this._http.post(AppURL.Upload, fd).subscribe( // Upload Image
        response => {
          this.result.result_img = `${response}`;
          this._resultService.update(this.result).subscribe(  // Update column result_img
            data => {
              if (data != null && data !== false) {
                this._http.get(`${AppURL.Remove}?image_name=${this.deleteImage}`).subscribe(  // Delete Image
                  image => { this._toastrService.success(this.result.result_name, 'แก้ไขหมวดหมู่ย่อยสำเร็จ.'); },
                  err => { this._toastrService.error(err, 'ลบรูปภาพล้มเหลว.'); }
                );
              }
            },
            err => { this._toastrService.error(err, 'แก้ไขหมวดหมู่ย่อยล้มเหลว'); }
          );
        },
        err => { this._toastrService.error(err, 'อัพโหลดรูปภาพไม่สำเร็จ.'); }
      );
    } else {
      this._resultService.update(this.result).subscribe(
        data => { this._toastrService.success(this.result.result_name, 'แก้ไขหมวดหมู่ย่อยสำเร็จ.'); },
        err => { this._toastrService.error(err, 'แก้ไขหมวดหมู่ย่อยล้มเหลว'); }
      );
    }
    this._dialogRef.close();
  }

}
