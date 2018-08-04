import { MaterialModule } from './../material.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [],
  entryComponents: [],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [MaterialModule, FlexLayoutModule]
})
export class SharedsModule { }
