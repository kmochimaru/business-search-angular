import { MemberDeleteComponent } from './member-delete/member-delete.component';
import { MemberUpdateComponent } from './member-update/member-update.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { IMember } from './member.interface';
import { AccountService } from './../../../shareds/account.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit, AfterViewInit {

  public members: any;
  public filter: '';
  public dataSource = new MatTableDataSource();
  public displayedColumns = ['id', 'firstname', 'lastname', 'email', 'role', 'updated_at', 'manage'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _accountService: AccountService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.loadMember();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  loadMember() {
    this._accountService.findAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  newMember() {
    const dialogRef = this._dialog.open(MemberCreateComponent, {
      width: '400px'
    }).afterClosed().subscribe(() => {
      this.loadMember();
    });
  }

  updateMember(member: IMember) {
    const dataArr = [];
    dataArr.push(member);
    const dialogRef = this._dialog.open(MemberUpdateComponent, {
      width: '400px',
      data: dataArr
    }).afterClosed().subscribe(() => {
      this.loadMember();
    });
  }

  deleteMember(id: number) {
    const dialogRef = this._dialog.open(MemberDeleteComponent, {
      width: '400px',
      data: { id: id }
    }).afterClosed().subscribe(() => {
      this.loadMember();
    });
  }

}
