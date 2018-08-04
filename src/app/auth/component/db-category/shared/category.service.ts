import { Observable } from 'rxjs';
import { Category } from './category';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AppURL } from '../../../../app.url';

const API_URL = `${AppURL.apiUrl}/categoryCtrl`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }

  create(category: Category) {
    return this._http.post(`${API_URL}/create.php`, category);
  }

  update(category: Category) {
    const httpParams = new HttpParams()
      .set('category_id', `${category.category_id}`)
      .set('category_name', category.category_name)
      .set('category_img', category.category_img)
      .set('province_id', `${category.province_id}`);
    return this._http.get(`${API_URL}/update.php`, { params: httpParams });
  }

  delete(id: number, image: string) {
    const httpParams = new HttpParams()
      .set('category_id', `${id}`)
      .set('category_img', image);
    return this._http.get(`${API_URL}/delete.php`, { params: httpParams });
  }

  findById(category: Category): Observable<Category[]> {
    const httpParams = new HttpParams()
      .set('category_id', `${category.category_id}`);
    return this._http.get<Category[]>(`${API_URL}/detail.php`, { params: httpParams });
  }

  findByProvince(province: number): Observable<Category[]> {
    const httpParams = new HttpParams()
      .set('province_id', `${province}`);
    return this._http.get<Category[]>(`${API_URL}/readByProvince.php`, { params: httpParams });
  }

  findAll(): Observable<Category[]> {
    return this._http.get<Category[]>(`${API_URL}/read.php`);
  }
}
