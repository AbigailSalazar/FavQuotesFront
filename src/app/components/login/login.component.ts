import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _userService:UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this._userService.login(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value).subscribe(data=>{
        localStorage.setItem("token", (data as any).token);
        localStorage.setItem("user", (data as any).user.id);
        this.router.navigate(["/"]);
      })
    } else {
      console.log('Formulario no válido');
    }
  }
}
