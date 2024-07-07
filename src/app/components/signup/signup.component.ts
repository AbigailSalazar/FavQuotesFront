import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private _userService: UserService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {

      const USER: User = {
        name: this.registerForm.get("name")?.value,
        email: this.registerForm.get("email")?.value,
        password: this.registerForm.get("password")?.value
      }
      this._userService.signUp(USER).subscribe(data => {
        this.router.navigate(["login"]);
      }, error => { console.log(error); }

      )

    } else {
      console.log('Form is not valid');
    }
  }
}
