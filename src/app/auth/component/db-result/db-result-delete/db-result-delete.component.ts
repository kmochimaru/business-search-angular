import { DbCategoryDeleteComponent } from './../../db-category/db-category-delete/db-category-delete.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ResultService } from './../shared/result.service';
import { Component, OnInit, Optional, Inject } from '@angular/core';

@Component({
  selector: 'app-db-result-delete',
  templateUrl: './db-result-delete.component.html',
  styleUrls: ['./db-result-delete.component.css']
})
export class DbResultDeleteComponent {

  public result_id = null;
  public result_img = '';

  constructor(
    private _resultService: ResultService,
    private _toastrService: ToastrService,
    private _dialogRef: MatDialogRef<DbResultDeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.result_id = data.id;
    this.result_img = data.image;
  }

  onSubmit() {
    this._resultService.delete(this.result_id, this.result_img).subscribe(
      response => {
        if (response === 1) {
          this._toastrService.success('ลบหมวดหมู่ย่อยสำเร็จ');
        } else {
          this._toastrService.error('ลบหมวดหมู่ย่อยไม่สำเร็จ');
        }
      }
    );

    this._dialogRef.close();
  }

}
