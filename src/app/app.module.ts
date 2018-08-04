import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouting } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { ResultComponent } from './result/result.component';
import { HomeComponent } from './home/home.component';
import { SharedsModule } from './shareds/shareds.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule, NG_SELECT_DEFAULT_CONFIG } from '@ng-select/ng-select';
import { LoginComponent } from './login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    AppRouting,
    SharedsModule,
    MaterialModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } },
    { provide: NG_SELECT_DEFAULT_CONFIG, useValue: { notFoundText: 'ไม่พบข้อมูล' } },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  declarations: [
    AppComponent,
    CategoryComponent,
    ResultComponent,
    HomeComponent,
    LoginComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
