import { AuthURL } from './../../../auth.url';
import { AppURL } from './../../../../app.url';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  AppURL = AppURL;
  AuthURL = AuthURL;

  constructor() {

  }

  ngOnInit() {
  }
}
