import { Component, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { validatorList } from '../../ts/validatorList';
import { createUser } from '../../ts/entities/User';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppModule],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css',
})
export class AccountPageComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      validatorList.isAllDigit(),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      validatorList.containsLetter(),
      validatorList.containsDigit(),
      validatorList.containsSpecialChar(),
    ]),
    confirmPassword: new FormControl('', [
      Validators.minLength(8),
      validatorList.containsLetter(),
      validatorList.containsDigit(),
      validatorList.containsSpecialChar(),
    ]),
  });
  submitted = true;
  currentUser = createUser();
  message = '';

  constructor(private userService: UserService, private router: Router) {
    this.currentUser = this.userService.getLoggedInUser() || createUser();
    this.form.controls.confirmPassword.addValidators(
      validatorList.isSamePassword(this.form.controls.password)
    );
    this.form.controls.username.addValidators([
      (control: AbstractControl): ValidationErrors | null => {
        return !this.userService.usernameExistedExcept(
          control.value,
          this.currentUser.username
        )
          ? null
          : { isUnique: { value: control.value } };
      },
    ]);
    this.form.controls.email.addValidators([
      (control: AbstractControl): ValidationErrors | null => {
        return !this.userService.emailExistedExcept(
          control.value,
          this.currentUser.email
        )
          ? null
          : { isUnique: { value: control.value } };
      },
    ]);
    this.form.controls.name.setValue(this.currentUser.name);
    this.form.controls.username.setValue(this.currentUser.username);
    this.form.controls.email.setValue(this.currentUser.email);
    this.form.controls.phone.setValue(this.currentUser.phone);
    this.form.controls.password.setValue(this.currentUser.password);
    this.form.controls.confirmPassword.setValue(this.currentUser.password);
  }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      alert('Vui lòng đăng nhập!');
      this.router.navigateByUrl('/login-page');
    }
    if (this.userService.isLocked()) {
      alert('Tài khoản đã bị khóa');
      this.router.navigateByUrl('/login-page');
      return;
    }
    if (this.userService.isAdmin()) {
      this.router.navigateByUrl('/manage-page');
      return;
    }
  }

  edit() {
    this.message = '';
  }

  onInput() {
    this.message = '';
  }

  isInvalidFormControl(formControl: FormControl) {
    return formControl.dirty && formControl.invalid;
  }

  isValidFormControl(formControl: FormControl) {
    return formControl.pristine || formControl.valid;
  }

  submit() {
    this.submitted = true;
    this.message = '';
    if (this.form.pristine) {
      alert('Chưa có thay đổi!');
      return;
    }
    if (this.form.invalid) {
      return;
    }
    this.form.markAsPristine();
    let name = this.form.value.name as string;
    let username = this.form.value.username as string;
    let email = this.form.value.email as string;
    let phone = this.form.value.phone as string;
    let password = this.form.value.password as string;
    this.userService.updateUser(name, username, email, phone, password);
    this.message = 'Cập nhật thành công';
  }

  getEmailWrapperClass(formControl: FormControl) {
    if (formControl.pristine && !this.submitted) {
      return 'form-wrapper-default form-wrapper-0';
    }
    const controlErrors = formControl.errors;
    if (controlErrors == null) {
      return 'form-wrapper-valid form-wrapper-1';
    }
    let className = 'form-wrapper-invalid form-wrapper-';
    if ('email' in controlErrors || 'required' in controlErrors) {
      return className + 2;
    }
    if ('isUnique' in controlErrors) {
      return className + 3;
    }
    return className + 2;
  }

  getUsernameWrapperClass(formControl: FormControl) {
    if (formControl.pristine && !this.submitted) {
      return 'form-wrapper-default form-wrapper-0';
    }
    const controlErrors = formControl.errors || {};
    let className = 'form-wrapper-invalid form-wrapper-';
    if ('required' in controlErrors || 'minlength' in controlErrors) {
      return className + 2;
    }
    if ('isUnique' in controlErrors) {
      return className + 3;
    }
    return 'form-wrapper-valid form-wrapper-1';
  }

  getPasswordWrapperClass(formControl: FormControl) {
    if (formControl.pristine && !this.submitted) {
      return 'form-wrapper-default form-wrapper-0';
    }
    const controlErrors = formControl.errors || {};
    let className = 'form-wrapper-invalid form-wrapper-';
    if ('required' in controlErrors || 'minlength' in controlErrors) {
      return className + 2;
    }
    if ('containsLetter' in controlErrors) {
      return className + 3;
    }
    if ('containsDigit' in controlErrors) {
      return className + 4;
    }
    if ('containsSpecialChar' in controlErrors) {
      return className + 5;
    }
    return 'form-wrapper-valid form-wrapper-1';
  }

  getInputWrapperClass(formControl: FormControl) {
    if (formControl.pristine && !this.submitted) {
      return 'form-wrapper-default';
    }
    if (formControl.valid) {
      return 'form-wrapper-valid';
    }
    return 'form-wrapper-invalid';
  }

  getInputClass(formControl: FormControl) {
    if (formControl.pristine) {
      return 'is-default';
    }
    if (formControl.valid) {
      return 'is-valid';
    }
    return 'is-invalid';
  }
}
