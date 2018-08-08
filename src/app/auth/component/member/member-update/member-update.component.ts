import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountService } from './../../../../shareds/account.service';
import { AlertService } from './../../../../shareds/alert.service';
import { Component, Inject, Optional } from '@angular/core';
import { Member } from '../shared/member';

@Component({
  selector: 'app-member-update',
  templateUrl: './member-update.component.html',
  styleUrls: ['./member-update.component.css']
})
export class MemberUpdateComponent {
  public member = new Member();

  constructor(
    private _alert: AlertService,
    private _account: AccountService,
    private dialogRef: MatDialogRef<MemberUpdateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.member = data[0];
    this.member.opassword = data[0].password;
  }

  onSubmit(): void {
    const date = new Date();
    const curr_date = date.getDate();
    const curr_month = date.getMonth() + 1;
    const curr_year = date.getFullYear();
    const currentDate = `${curr_date}/${curr_month}/${curr_year}`;
    this.member.updated_at = currentDate;
    this._account
      .update(this.member)
      .subscribe(res => {
        this._alert.notify('แก้ไขสมาชิกสำเร็จ', 'success');
      },
        err => {
          this._alert.notify(err, 'danger');
        }
      );
    this.dialogRef.close();
  }

}
