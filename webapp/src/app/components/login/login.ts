import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  fb = inject(FormBuilder);
  constructor(private auth: Auth, private router: Router) { }
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {
    let value = this.loginForm.value;
    this.auth.login(value.email!, value.password!).subscribe((result: any) => {
      let tkn = `Bearer ${result.token}`;
      localStorage.setItem('token', tkn);
      localStorage.setItem('user', JSON.stringify(result.user));
      this.router.navigate(['/']);
    });
  }

}
