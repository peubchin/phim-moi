import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AppModule } from '../app.module';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppModule,
    RouterLink,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      // Validators.minLength(6),
    ]),
    loginPassword: new FormControl('', [
      Validators.required,
      // Validators.minLength(8),
    ]),
  });
  message: string = '';
  submitted: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.submitted = true;
    if (this.userService.isLoggedIn()) {
      this.message = 'Vui lòng đăng xuất khỏi tài khoản hiện tại!';
      return;
    }
    const username = this.form.value.username as string;
    const loginPassword = this.form.value.loginPassword as string;
    this.userService.logIn(username, loginPassword);
    if (!this.userService.isLoggedIn()) {
      this.message = 'Tên đăng nhập hoặc mật khẩu không đúng!';
      return;
    }
    if (this.userService.getLoggedInUser().lock) {
      alert('Tài khoản đã bị khóa');
      this.userService.logOut();
      return;
    }
    this.message = 'Đăng nhập thành công!';
    this.form.reset();
    this.router.navigateByUrl('').then(() => {
      // window.location.reload();
    });
  }

  onLoggedOut() {
    this.message = 'Đã đăng xuất!';
  }

  getInputWrapperClass(formControl: FormControl) {
    if (formControl.pristine && !this.submitted) {
      return 'form-wrapper-default form-wrapper-0';
    }
    if (formControl.valid) {
      return 'form-wrapper-default form-wrapper-0';
    }
    return 'form-wrapper-invalid form-wrapper-2';
  }
}
