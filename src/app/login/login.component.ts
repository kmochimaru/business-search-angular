import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

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

  }

  onRegister(): void {

  }

  private initialFormData() {

  }

}
