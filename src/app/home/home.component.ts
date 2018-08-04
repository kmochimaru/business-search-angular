import { ProvinceService } from './../shareds/province.service';
import { AppURL } from './../app.url';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public AppURL: any;
  public provinces: any;
  public provinceSelected = '';
  items: any;

  constructor(private _provinceService: ProvinceService,
    private _router: Router,
    private _toastService: ToastrService) { }

  ngOnInit() {
    this.AppURL = AppURL;
    this.loadProvince();
  }

  onSubmit() {
    if (this.provinceSelected !== '' && this.provinceSelected != null) {
      this._router.navigate(['/', AppURL.Category, this.provinceSelected]);
    } else {
      this._toastService.warning('กรุณาเลือกจังหวัด');
    }
  }

  loadProvince() {
    this._provinceService.findByCategory().subscribe(
      data => {
        this.items = data;
      });
  }

}
