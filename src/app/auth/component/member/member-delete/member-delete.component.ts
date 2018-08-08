import { AccountService } from './../../../../shareds/account.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Component, Optional, Inject } from '@angular/core';

@Component({
  selector: 'app-member-delete',
  templateUrl: './member-delete.component.html',
  styleUrls: ['./member-delete.component.css']
})
export class MemberDeleteComponent {
  public id = null;

  constructor(
    private _account: AccountService,
    private _toastrService: ToastrService,
    private _dialogRef: MatDialogRef<MemberDeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
  }

  onSubmit() {
    this._account.delete(this.id).subscribe(
      response => {
        if (response === 1) {
          this._toastrService.success('ลบสมาชิกสำเร็จ');
        } else {
          this._toastrService.error('ลบสมาชิกไม่สำเร็จ');
        }
      }
    );

    this._dialogRef.close();
  }

}
