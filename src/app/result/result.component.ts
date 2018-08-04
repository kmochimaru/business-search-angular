import { ProvinceService } from './../shareds/province.service';
import { ResultService } from './../auth/component/db-result/shared/result.service';
import { AppURL } from './../app.url';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  public AppURL: any;
  public results: any;
  public category_id: number;
  public province_name: string;

  constructor(private _resultService: ResultService,
    private _provinceService: ProvinceService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.AppURL = AppURL;
    this.category_id = this._activatedRoute.snapshot.params['category_id'];
    this.loadResult(this.category_id);
  }

  loadResult(category_id: number) {
    this._resultService.findByCategory(category_id).subscribe(
      data => {
        this.results = data;
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
