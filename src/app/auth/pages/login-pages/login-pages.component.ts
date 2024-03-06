import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.css']
})
export class LoginPagesComponent {
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)

  public myForm: FormGroup = this.fb.group({
    email: ['pedro@hotmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  login() {
    // console.log(this.myForm.value)

    const { email, password } = this.myForm.value

    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('Dashboard'),
        error: (errormessage => {
          Swal.fire('Error', errormessage, 'error')
        })
      })

    // this.myForm.valid ? this.myForm.reset() : ''
  }
}
