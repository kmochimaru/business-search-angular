import { ProvinceService } from './../shareds/province.service';
import { CategoryService } from './../auth/component/db-category/shared/category.service';
import { AppURL } from '../app.url';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public AppURL: any;
  public categories: any;
  public province_id: number;
  public province_name: string;

  constructor(private _categoryService: CategoryService,
    private _provinceService: ProvinceService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.AppURL = AppURL;
    this.province_id = this._activatedRoute.snapshot.params['province_id'];
    this.loadProvince(this.province_id);
    this.loadCategory(this.province_id);
  }

  loadCategory(province_id: number) {
    this._categoryService.findByProvince(province_id).subscribe(
      data => {
        this.categories = data;
      }
    );
  }

  loadProvince(province_id: number) {
    this._provinceService.findById(province_id).subscribe(
      data => {
        this.province_name = data[0].province_name;
      }
    );
  }

}
