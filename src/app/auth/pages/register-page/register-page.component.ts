import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterUser } from '../../interfaces/registerUser.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private serviceAuth = inject(AuthService)
  private fb = inject(FormBuilder)
  private route = inject(Router)

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  public mensaje: string | null = null

  crearCuenta() {
    this.serviceAuth.register(this.myForm.value)
      .subscribe(res => {
        if (res !== false) {
          return this.route.navigateByUrl('Auth/auth/login')
        }
        this.myForm.controls['email'].reset()
        return this.mensaje = 'Error, Ya existe el correo'
      })
  }
}
