import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
  ValidatorFn,
  FormsModule,
} from '@angular/forms';
import { createUser, User } from '../../ts/entities/User';
import { validatorList } from '../../ts/validatorList';
import { MovieService } from '../service/movie.service';
import { UserService } from '../service/user.service';
import { ManageService } from '../service/manage.service';
import { paginationInfo } from '../../ts/entities/PaginationInfo';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css',
})
export class ManageUserComponent {
  userForm = new FormGroup({
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
    isAdmin: new FormControl(false),
  });
  userFormSubmitted = true;
  request = 'add';
  updatingUser = createUser();
  loggedInUsername = '';
  userList: User[] = [];
  filterSelect: string = '';
  filterSearch: string = '';
  pgntInfo: paginationInfo = {
    itemsPerPage: 4,
    currentPage: 1,
  };

  constructor(
    private userService: UserService,
    private movieService: MovieService,
    private manageService: ManageService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.updatingUser = this.userService.getLoggedInUser() || createUser();
    this.userForm.controls.confirmPassword.addValidators(
      validatorList.isSamePassword(this.userForm.controls.password)
    );
    this.validateUpdateUsername();
  }

  ngOnInit(): void {
    this.userList = this.userService.getUserList();
  }

  getPageUserList() {
    if (this.pgntInfo.currentPage > this.getPageQuantity()) {
      this.pgntInfo.currentPage = this.getPageQuantity();
    }
    const startIdx =
      (this.pgntInfo.currentPage - 1) * this.pgntInfo.itemsPerPage;
    const endIdx = startIdx + this.pgntInfo.itemsPerPage;
    return this.getUserList().slice(startIdx, endIdx);
  }

  getUserList() {
    let userList = this.userService.getUserList().slice();
    userList = this.filterMovieListSelect(userList);
    userList = this.filterMovieListSearch(userList);
    return userList;
  }

  getPageQuantity() {
    const quantity = Math.ceil(
      this.getUserList().length / this.pgntInfo.itemsPerPage
    );
    return quantity;
  }

  back() {
    this.pgntInfo.currentPage -= 1;
    if (this.pgntInfo.currentPage <= 0) {
      this.pgntInfo.currentPage = 1;
    }
  }

  doubleBack() {
    this.pgntInfo.currentPage -= 2;
    if (this.pgntInfo.currentPage <= 0) {
      this.pgntInfo.currentPage = 1;
    }
  }

  next() {
    this.pgntInfo.currentPage += 1;
    if (this.pgntInfo.currentPage > this.getPageQuantity()) {
      this.pgntInfo.currentPage = this.getPageQuantity();
    }
  }

  doubleNext() {
    this.pgntInfo.currentPage += 2;
    if (this.pgntInfo.currentPage > this.getPageQuantity()) {
      this.pgntInfo.currentPage = this.getPageQuantity();
    }
  }

  skipToEnd() {
    this.pgntInfo.currentPage = this.getPageQuantity();
  }

  skipToStart() {
    this.pgntInfo.currentPage = 1;
  }

  filterMovieListSearch(userList: User[]) {
    if (this.filterSearch.length == 0) {
      return userList;
    }
    let key = this.filterSearch.trim().toLowerCase();
    return userList.filter((user) => {
      return user.username.toLowerCase().indexOf(key) != -1;
    });
  }

  filterMovieListSelect(userList: User[]) {
    if (this.filterSelect.length == 0) {
      return userList;
    }
    switch (this.filterSelect) {
      case 'lock':
        return userList.filter((user) => {
          return user.lock;
        });
      case 'admin':
        return userList.filter((user) => {
          return user.isAdmin;
        });
      default:
        return userList;
    }
  }

  add() {
    this.userFormSubmitted = true;
    if (this.userForm.invalid) {
      return;
    }
    let name = this.userForm.value.name as string;
    let username = this.userForm.value.username as string;
    let email = this.userForm.value.email as string;
    let phone = this.userForm.value.phone as string;
    let password = this.userForm.value.password as string;
    let isAdmin = this.userForm.value.isAdmin as boolean;
    this.manageService.addUserByAdmin(
      name,
      username,
      email,
      phone,
      password,
      isAdmin
    );
    alert('Thêm thành công');
    this.userForm.reset();
    this.userFormSubmitted = false;
  }

  update() {
    this.userFormSubmitted = true;
    if (this.userForm.pristine) {
      alert('Chưa có thay đổi');
      return;
    }
    if (this.userForm.invalid) {
      return;
    }
    let name = this.userForm.value.name as string;
    let username = this.userForm.value.username as string;
    let email = this.userForm.value.email as string;
    let phone = this.userForm.value.phone as string;
    let password = this.userForm.value.password as string;
    let isAdmin = this.userForm.value.isAdmin as boolean;
    if (isAdmin == null) {
      isAdmin = true;
    }
    this.manageService.updateUserByAdmin(
      this.updatingUser.username,
      name,
      username,
      email,
      phone,
      password,
      isAdmin
    );
    this.userForm.markAsPristine();
    alert('Sửa thành công');
  }

  openAdd() {
    this.request = 'add';
    this.userForm.controls.username.clearValidators();
    this.userForm.controls.username.addValidators([
      Validators.required,
      Validators.minLength(6),
      this.validateAddUsername(),
    ]);
    this.userForm.controls.email.clearValidators();
    this.userForm.controls.email.addValidators([
      Validators.required,
      Validators.email,
      this.validateAddEmail(),
    ]);
    this.userFormSubmitted = false;
    this.userForm.reset();
    this.userForm.controls.isAdmin.enable();
  }

  openUpdate(username: string) {
    this.userForm.controls.username.clearValidators();
    this.userForm.controls.username.addValidators([
      Validators.required,
      Validators.minLength(6),
      this.validateUpdateUsername(),
    ]);
    this.userForm.controls.email.clearValidators();
    this.userForm.controls.email.addValidators([
      Validators.required,
      Validators.email,
      this.validateUpdateEmail(),
    ]);

    this.request = 'update';
    this.userFormSubmitted = true;
    this.updatingUser = this.manageService.getUser(username);
    this.userForm.controls.name.setValue(this.updatingUser.name);
    this.userForm.controls.username.setValue(this.updatingUser.username);
    this.userForm.controls.email.setValue(this.updatingUser.email);
    this.userForm.controls.phone.setValue(this.updatingUser.phone);
    this.userForm.controls.password.setValue(this.updatingUser.password);
    this.userForm.controls.confirmPassword.setValue(this.updatingUser.password);
    this.userForm.controls.isAdmin.setValue(this.updatingUser.isAdmin);
    if (this.updatingUser.username == this.manageService.getRootUsername()) {
      this.userForm.controls.isAdmin.disable();
    } else {
      this.userForm.controls.isAdmin.enable();
    }
  }

  validateAddEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !this.userService.emailExisted(control.value)
        ? null
        : { isUnique: { value: control.value } };
    };
  }

  validateAddUsername(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !this.userService.usernameExisted(control.value)
        ? null
        : { isUnique: { value: control.value } };
    };
  }

  validateUpdateEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !this.userService.emailExistedExcept(
        control.value,
        this.updatingUser.email
      )
        ? null
        : { isUnique: { value: control.value } };
    };
  }

  validateUpdateUsername(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !this.userService.usernameExistedExcept(
        control.value,
        this.updatingUser.username
      )
        ? null
        : { isUnique: { value: control.value } };
    };
  }

  deleteUser(username: string) {
    let confirmed = confirm('Xác nhận xóa');
    if (!confirmed) {
      return;
    }
    if (username == this.manageService.getRootUsername()) {
      alert('Không thể xóa tài khoản chủ');
      return;
    }
    this.manageService.deleteUser(username);
  }

  unlockUser(username: string) {
    let confirmed = confirm('Xác nhận mở khóa');
    if (!confirmed) {
      return;
    }
    this.manageService.unlockUser(username);
  }

  lockUser(username: string) {
    let confirmed = confirm('Xác nhận khóa');
    if (!confirmed) {
      return;
    }
    if (username == this.manageService.getRootUsername()) {
      alert('Không thể khóa tài khoản chủ');
      return;
    }
    this.manageService.lockUser(username);
  }

  getLoggedInUsername() {
    console.log(this.userService.getLoggedInUser().username);
    return this.userService.getLoggedInUser().username;
  }

  getEmailWrapperClass(formControl: FormControl) {
    if (formControl.pristine && !this.userFormSubmitted) {
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
    if (formControl.pristine && !this.userFormSubmitted) {
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
    if (formControl.pristine && !this.userFormSubmitted) {
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
    if (formControl.pristine && !this.userFormSubmitted) {
      return 'form-wrapper-default';
    }
    if (formControl.valid) {
      return 'form-wrapper-valid';
    }
    return 'form-wrapper-invalid';
  }

  getAdminUserQuantity() {
    let s = 0;
    this.userService.getUserList().forEach((user) => {
      if (user.isAdmin) {
        s += 1;
      }
    });
    return s;
  }

  getLockUserQuantity() {
    let s = 0;
    this.userService.getUserList().forEach((user) => {
      if (user.lock) {
        s += 1;
      }
    });
    return s;
  }
}
