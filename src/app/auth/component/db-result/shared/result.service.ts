import { AppURL } from './../../../../app.url';
import { Observable } from 'rxjs';
import { Result } from './result';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = `${AppURL.apiUrl}/resultCtrl`;

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private _http: HttpClient) { }

  create(result: Result) {
    return this._http.post(`${API_URL}/create.php`, result);
  }

  update(result: Result) {
    const httpParams = new HttpParams()
      .set('result_id', `${result.result_id}`)
      .set('result_name', result.result_name)
      .set('result_img', result.result_img)
      .set('category_id', `${result.category_id}`);
    return this._http.get(`${API_URL}/update.php`, { params: httpParams });
  }

  delete(id: number, image: string) {
    const httpParams = new HttpParams()
      .set('result_id', `${id}`)
      .set('result_img', image);
    return this._http.get(`${API_URL}/delete.php`, { params: httpParams });
  }

  findById(result: Result): Observable<Result[]> {
    const httpParams = new HttpParams()
      .set('result_id', `${result.result_id}`);
    return this._http.get<Result[]>(`${API_URL}/detail.php`, { params: httpParams });
  }

  findByCategory(category_id: number): Observable<Result[]> {
    const httpParams = new HttpParams()
      .set('category_id', `${category_id}`);
    return this._http.get<Result[]>(`${API_URL}/readByCategory.php`, { params: httpParams });
  }

  findAll(): Observable<Result[]> {
    return this._http.get<Result[]>(`${API_URL}/read.php`);
  }
}
