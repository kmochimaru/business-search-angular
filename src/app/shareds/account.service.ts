import { Member } from './../auth/component/member/shared/member';
import { Observable } from 'rxjs';
import { IMember } from './../auth/component/member/member.interface';
import { AppURL } from './../app.url';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = `${AppURL.apiUrl}/userCtrl`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private _http: HttpClient
  ) { }

  isLogin(model: IMember) {
    return this._http.post(`${API_URL}/authentication.php`, model);
  }

  create(model: IMember) {
    return this._http.post(`${API_URL}/create.php`, model);
  }

  update(model: IMember) {
    return this._http.post(`${API_URL}/update.php`, model);
  }

  delete(id: number) {
    const httpParams = new HttpParams()
      .set('id', `${id}`);
    return this._http.get(`${API_URL}/delete.php`, { params: httpParams });
  }

  findById(model: IMember): Observable<IMember[]> {
    const httpParams = new HttpParams()
      .set('id', `${model.id}`);
    return this._http.get<IMember[]>(`${API_URL}/detail.php`, { params: httpParams });
  }

  isAuthen(): any {
    const httpParams = new HttpParams()
      .set('action', 'CheckAuthen');
    return this._http.get(`${API_URL}/authentication.php`, { params: httpParams });
  }

  findAll(): Observable<IMember[]> {
    return this._http.get<IMember[]>(`${API_URL}/read.php`);
  }

  logout(): any {
    return this._http.get(`${API_URL}/logout.php`);
  }

}
