import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { PrimeModule } from '../prime/prime.module';


// import { PrimeModule } from '../prime/prime.module';
// import { ButtonModule } from 'primeng/button';
// import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PrimeModule,
    // PrimeModule,
    // ButtonModule,
    // RippleModule
  ]
})
export class DashboardModule { }
