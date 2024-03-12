import { Component, OnInit, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

import { MenuItem } from 'primeng/api'
import { Users } from '../../interfaces/users.interfaces';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private authService = inject(AuthService)
  public infoUsuario = computed(() => this.authService.currentUser())
  private router = inject(Router)
  private infoUsers = inject(UsersService)

  public items: MenuItem[] | undefined;
  public usuarios: Users[] = []




  ngOnInit(): void {
    this.items = [
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.onLogout()
      }
    ]

    this.infoUsers.getUsers()
      .subscribe(resultado => {
        this.usuarios = resultado;
      })

    // console.log(this.infoUsers);
  }


  onLogout() {
    this.authService.logout()
    this.router.navigateByUrl('Auth/auth/login')
  }


}
