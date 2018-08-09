import { AuthURL } from './../auth/auth.url';
import { AppURL } from './../app.url';
import { AccountService } from './../shareds/account.service';
import { AlertService } from './../shareds/alert.service';
import { ValidatorsService } from './../shareds/validators.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare let $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  AppURL = AppURL;
  AuthURL = AuthURL;
  formLogin: FormGroup;
  formRegister: FormGroup;

  constructor(
    private _builder: FormBuilder,
    private _validators: ValidatorsService,
    private _alert: AlertService,
    private _account: AccountService,
    private _router: Router
  ) {
    this.initialFormLogin();
    this.initialFormRegister();
  }

  ngOnInit() {
    // Toggle Function
    $('.toggle').click(function () {
      // Switches the Icon
      $(this).children('i').toggleClass('fa-pencil');
      // Switches the forms
      $('.form').animate({
        height: 'toggle',
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: 'toggle'
      }, 'slow');
    });
  }

  onLogin(): void {
    if (this.formLogin.invalid) { return this._alert.notify('กรุณากรอกข้อมูลให้ครบ'); }
    this._account.isLogin(this.formLogin.value).subscribe(
      res => {
        if (res == '0') { return this._alert.notify('กรุณาตรวจสอบอีเมลกับรหัสผ่านอีกครั้ง', 'warning'); }
        this._alert.notify('เข้าสู่ระบบสำเร็จ', 'success');
        this._router.navigate(['', AppURL.Auth, AuthURL.DbMember]);
      },
      err => { this._alert.notify(err, 'info'); }
    );
  }

  onRegister(): void {
    if (this.formRegister.invalid) { return this._alert.notify('กรุณากรอกข้อมูลให้ครบ'); }
    const date = new Date();
    const curr_date = date.getDate();
    const curr_month = date.getMonth() + 1;
    const curr_year = date.getFullYear();
    const currentDate = `${curr_date}/${curr_month}/${curr_year}`;
    this.formRegister.value.updated_at = currentDate;
    this.formRegister.value.created_at = currentDate;
    this.formRegister.value.role = 'Admin';
    this._account
      .create(this.formRegister.value)
      .subscribe(res => {
        // Check Duplicate
        if (res.errorInfo == null) {
          this._alert.notify('ลงทะเบียนสำเร็จ', 'success');
          setTimeout(() => {
            location.reload();
          }, 1800);
        } else {
          if (res.errorInfo[1] == '1062') { return this._alert.notify('อีเมลนี้มีอยู่ในระบบแล้ว', 'warning'); }
        }
      },
        err => {
          this._alert.notify(err, 'danger');
        }
      );
  }

  private initialFormLogin() {
    this.formLogin = this._builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this._validators.isPassword]]
    });
  }

  private initialFormRegister() {
    this.formRegister = this._builder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this._validators.isPassword]],
      cpassword: ['', [Validators.required, this._validators.comparePassword('password')]]
    });
  }

}
