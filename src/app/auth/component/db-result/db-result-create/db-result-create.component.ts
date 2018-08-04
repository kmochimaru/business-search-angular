import { Category } from './../../db-category/shared/category';
import { ResultService } from './../shared/result.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ErrorStateMatcher } from '@angular/material/core';
import { AppURL } from './../../../../app.url';
import { Result } from './../shared/result';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-db-result-create',
  templateUrl: './db-result-create.component.html',
  styleUrls: ['./db-result-create.component.css']
})
export class DbResultCreateComponent {

  public result = new Result();
  public categories: Category;
  public resultImage: File = null;
  public resultNameFormControl = new FormControl('', [Validators.required]);
  public resultImgFormControl = new FormControl('', [Validators.required]);
  public resultIdFormControl = new FormControl('', [Validators.required]);
  public matcher = new MyErrorStateMatcher();

  constructor(private _resultService: ResultService,
    private _toastrService: ToastrService,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<DbResultCreateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.categories = data;
  }

  onImageSelected(event) {
    this.resultImage = <File>event.target.files[0];
  }

  onSubmit() {
    const fd = new FormData();
    fd.append('file', this.resultImage, this.resultImage.name);

    // if (this.resultNameFormControl.valid &&
    //   this.resultImgFormControl.valid &&
    //   this.provinceIdFormControl.valid) {
    this._http.post(AppURL.Upload, fd)
      .subscribe( //  Upload Image
        response => {
          this.result.result_img = `${response}`;
          this._resultService.create(this.result).subscribe(  // Create result
            data => {
              if (data != null && data !== false) {
                this._toastrService.success(this.result.result_name, 'เพิ่มหมวดหมู่ย่อยสำเร็จ.');
              }
            },
            err => { this._toastrService.error(err, 'เพิ่มหมวดหมู่ย่อยล้มเหลว'); }
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
