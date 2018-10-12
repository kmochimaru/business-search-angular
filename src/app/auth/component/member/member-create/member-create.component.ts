import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountService } from './../../../../shareds/account.service';
import { AlertService } from './../../../../shareds/alert.service';
import { Component, Inject, Optional } from '@angular/core';
import { Member } from '../shared/member';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent {
  public member = new Member();

  // firstname = new FormControl('', Validators.required);
  // lastname = new FormControl('', Validators.required);
  // email = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('', Validators.required);
  // role = new FormControl('', Validators.required);

  constructor(
    private _alert: AlertService,
    private _account: AccountService,
    private dialogRef: MatDialogRef<MemberCreateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.member.role = 'Admin';
  }

  onSubmit(): void {
    const date = new Date();
    const curr_date = date.getDate();
    const curr_month = date.getMonth() + 1;
    const curr_year = date.getFullYear();
    const currentDate = `${curr_date}/${curr_month}/${curr_year}`;
    this.member.updated_at = currentDate;
    this.member.created_at = currentDate;
    this._account
      .create(this.member)
      .subscribe(res => {
        // Check Duplicate
        if (res['errorInfo'] == null) {
          this._alert.notify('เพิ่มสมาชิกสำเร็จ', 'success');
          this.dialogRef.close();
        } else {
          // tslint:disable-next-line:triple-equals
          if (res['errorInfo'][1] == '1062') { return this._alert.notify('อีเมลนี้มีอยู่ในระบบแล้ว', 'warning'); }
        }
      },
        err => {
          this._alert.notify(err, 'danger');
          this.dialogRef.close();
        }
      );
  }
}
