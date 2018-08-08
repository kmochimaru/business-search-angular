import { MemberComponent } from './component/member/member.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DbResultComponent } from './component/db-result/db-result.component';
import { DbCategoryComponent } from './component/db-category/db-category.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './auth.url';

const RouteLists: Routes = [
  { path: '', redirectTo: AuthURL.Dashboard, pathMatch: 'full' },
  { path: AuthURL.Dashboard, component: DashboardComponent },
  { path: AuthURL.DbMember, component: MemberComponent },
  { path: AuthURL.DbCategory, component: DbCategoryComponent },
  { path: AuthURL.DbResult, component: DbResultComponent }
];

export const AuthRouting = RouterModule.forChild(RouteLists);
