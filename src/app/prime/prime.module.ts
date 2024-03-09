import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// import { PrimeModule } from '../prime/prime.module';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonModule,
    MenubarModule,
    RippleModule,
    TableModule,
    CardModule,
    DropdownModule
  ]
})
export class PrimeModule { }
