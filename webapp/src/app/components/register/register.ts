import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  fb = inject(FormBuilder);
  constructor(private auth: Auth, private router: Router) { }
  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  register() {
    let value = this.registerForm.value;
    this.auth.register(value.name!, value.email!, value.password!).subscribe((result) => {
      alert("user registered");
      this.router.navigate(['/login']);
    });
  }
}
