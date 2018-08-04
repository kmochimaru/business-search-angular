import { SharedsModule } from './../shareds/shareds.module';
import { AuthRouting } from './auth.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbCategoryComponent } from './component/db-category/db-category.component';
import { DbResultComponent } from './component/db-result/db-result.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './component/main-layout/footer/footer.component';
import { NavigationComponent } from './component/main-layout/navigation/navigation.component';
import { ContentComponent } from './component/main-layout/content/content.component';
import { DbCategoryCreateComponent } from './component/db-category/db-category-create/db-category-create.component';
import { DbCategoryUpdateComponent } from './component/db-category/db-category-update/db-category-update.component';
import { DbCategoryDeleteComponent } from './component/db-category/db-category-delete/db-category-delete.component';
import { DbResultCreateComponent } from './component/db-result/db-result-create/db-result-create.component';
import { DbResultUpdateComponent } from './component/db-result/db-result-update/db-result-update.component';
import { DbResultDeleteComponent } from './component/db-result/db-result-delete/db-result-delete.component';
import { MemberComponent } from './component/member/member.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRouting,
    SharedsModule
  ],
  declarations: [
    DbCategoryComponent,
    DbResultComponent,
    DashboardComponent,
    FooterComponent,
    NavigationComponent,
    ContentComponent,
    DbCategoryCreateComponent,
    DbCategoryUpdateComponent,
    DbCategoryDeleteComponent,
    DbResultCreateComponent,
    DbResultUpdateComponent,
    DbResultDeleteComponent,
    MemberComponent
  ],
  entryComponents: [
    DbCategoryCreateComponent,
    DbCategoryUpdateComponent,
    DbCategoryDeleteComponent,
    DbResultCreateComponent,
    DbResultUpdateComponent,
    DbResultDeleteComponent
  ]
})
export class AuthModule { }
