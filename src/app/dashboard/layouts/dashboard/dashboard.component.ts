import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private authService = inject(AuthService)
  public infoUsuario = computed(() => this.authService.currentUser())
  private router = inject(Router)


  onLogout() {
    this.authService.logout()
    // this.router.navigateByUrl('Auth/auth/login')
  }


}
