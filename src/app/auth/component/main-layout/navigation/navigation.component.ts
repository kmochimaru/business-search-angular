import { AlertService } from './../../../../shareds/alert.service';
import { AccountService } from './../../../../shareds/account.service';
import { Router } from '@angular/router';
import { AuthURL } from './../../../auth.url';
import { AppURL } from './../../../../app.url';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  AppURL = AppURL;
  AuthURL = AuthURL;

  constructor(
    private _router: Router,
    private _account: AccountService,
    private _alert: AlertService
  ) {
    this.checkAuthen();
  }

  onLogout() {
    this._account.logout()
      .subscribe(res => {
        if (res.Message == 'logout success') {
          this._alert.notify('ออกจากระบบสำเร็จ', 'success');
          this._router.navigate(['', AppURL.Login]);
        }
      });
  }

  checkAuthen() {
    this._account.isAuthen()
      .subscribe(res => {
        console.log(res);

      });
  }
}
