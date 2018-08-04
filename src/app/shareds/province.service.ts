import { AppURL } from './../app.url';
import { Province, ServerProvince } from './province';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

const API_URL = `${AppURL.apiUrl}/provinceCtrl`;

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  public province: any;

  constructor(private _http: HttpClient) { }

  findAll() {
    return this._http
      .get(`${API_URL}/read.php`).pipe(
        map((response: ServerProvince[]) => {
          return response.map(item => Province.mapClass(item));
        })
      );
  }

  findByCategory() {
    return this._http
      .get(`${API_URL}/readByCategory.php`).pipe(
        map((response: ServerProvince[]) => {
          return response.map(item => Province.mapClass(item));
        })
      );
  }

  findById(province_id: number) {
    return this._http
      .get(`${API_URL}/detail.php?province_id=${province_id}`).pipe(
        map((response: ServerProvince[]) => {
          return response.map(item => Province.mapClass(item));
        })
      );
  }
}
