import { AlertService } from './../shareds/alert.service';
import { ValidatorsService } from './../shareds/validators.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
declare let $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  formRegister: FormGroup;

  constructor(
    private _builder: FormBuilder,
    private _validators: ValidatorsService,
    private _alert: AlertService
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
  }

  onRegister(): void {
    if (this.formRegister.invalid) { return this._alert.notify('กรุณากรอกข้อมูลให้ครบ'); }
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
