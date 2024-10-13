import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  NgModel,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  appStore = inject(AppStore)
  isPasswordVisible: boolean = false;
  [x: string]: any;

  loginForm: FormGroup;

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  submit() {
    console.log(this.loginForm.value);
    const { userName, password } = this.loginForm.value;
    this.authService.login(userName, password).subscribe((response) => {
      console.log(response);
      if (response?.token) {
        this.getLoggedUser(response.token)
        this.router.navigate(['/']);
      }
    });
  }

  submitLogout() {
    this.authService.logout();
  }

  getLoggedUser(token:string){
    this.authService.getUser(token).subscribe((response)=>{
      if(response?.userInfo){
        console.log(response.userInfo)
        this.appStore.setUser(response.userInfo)
      }
    })
  }
}
