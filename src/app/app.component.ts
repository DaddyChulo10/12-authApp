import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private authService = inject(AuthService)
  private router = inject(Router)
  private primeNgConfig = inject(PrimeNGConfig)

  ngOnInit(): void {
    this.primeNgConfig.ripple = true
  }



  public finishedAuthChecked = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false
    }
    return true
  })

  public authStatusChangedEffect = effect(() => {

    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/Dashboard/dashboard')
        return
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/Auth/auth/register')

    }

    this.authService.authStatus()
  })
}
