import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  addMonthToDate,
  compareDateString,
  dateToString,
} from '../../ts/utility';
import { PackService } from '../service/pack.service';
import { Pack } from '../../ts/entities/Pack';
import { UserService } from '../service/user.service';
import { Bill } from '../../ts/entities/Bill';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pack-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppModule],
  templateUrl: './pack-page.component.html',
  styleUrl: './pack-page.component.css',
})
export class PackPageComponent {
  billList: Bill[] = [];
  packList: Pack[] = [];
  currentPackID: string = '';
  quantityControl = new FormControl('1');
  itemQuantity = 0;
  itemsPerPage = 4;

  constructor(
    private userService: UserService,
    private packService: PackService,
    private router: Router
  ) {}

  ngOnInit() {
    this.itemQuantity = this.itemsPerPage;
    this.billList = this.userService.getLoggedInUser().billList;
    this.packList = this.packService.getPackList();
    this.currentPackID = this.packList[1].ID;
    if (this.userService.billIsExpired()) {
      return;
    }
    const lastBill = this.billList.at(-1) as Bill;
    this.currentPackID = lastBill.packID;
    this.quantityControl.disable();
    this.quantityControl.setValue(String(lastBill.monthQuantity));
  }

  needShowCollapse() {
    return this.itemQuantity > this.itemsPerPage;
  }

  needShowSeeMore() {
    return this.billList.length > this.itemQuantity;
  }

  collapse() {
    this.itemQuantity = this.itemsPerPage;
  }

  seeMore() {
    this.itemQuantity += this.itemsPerPage;
  }

  getLastExpiredDate() {
    return this.userService.getExpiredDate();
  }

  lastBillIsExpired() {
    return this.userService.billIsExpired();
  }

  getExpiredDate() {
    return addMonthToDate(new Date(), this.getMonthQuantity());
  }

  cancel() {
    let confirmed = confirm('Xác nhận hủy');
    if (!confirmed) {
      return;
    }
    this.quantityControl.setValue('1');
    this.quantityControl.enable();
    this.userService.cancelBill();
  }

  pay() {
    if (!this.userService.isLoggedIn()) {
      alert('Đăng nhập để mua gói');
      this.router.navigateByUrl('/login-page');
      return;
    }
    if (this.userService.isLocked()) {
      alert('Tài khoản đã bị khóa');
      this.router.navigateByUrl('/login-page');
      return;
    }
    if (this.userService.isAdmin()) {
      alert('Người quản trị không cần mua');
      return;
    }
    this.quantityControl.disable();
    this.userService.addBill(this.currentPackID, this.getMonthQuantity());
  }

  isPaid() {
    return !this.userService.billIsExpired();
  }

  getPackByID(ID: string) {
    const pack = this.packList.find((pack) => {
      return pack.ID == ID;
    });
    return pack ? pack : this.packList[0];
  }

  choosePack(packID: string) {
    if (this.isPaid()) {
      return;
    }
    this.currentPackID = packID;
  }

  isCurrentPack(packID: string) {
    return packID == this.currentPackID;
  }

  getMonthQuantity() {
    let monthQuantity = parseInt(String(this.quantityControl.value));
    if (isNaN(monthQuantity)) {
      return 0;
    }
    if (monthQuantity > 12) {
      monthQuantity = 12;
    }
    if (monthQuantity < 1) {
      monthQuantity = 1;
    }
    this.quantityControl.setValue(String(monthQuantity));
    return monthQuantity;
  }

  total() {
    let quantity = this.getMonthQuantity();
    let currentPack = this.packList.find((pack) => {
      return pack.ID == this.currentPackID;
    });
    let price = Number(currentPack?.price);
    if (quantity == 0) {
      return price;
    }
    if (quantity > 12) {
      quantity = 12;
    }
    if (quantity < 1) {
      quantity = 1;
    }
    this.quantityControl.setValue(String(quantity));
    return price * quantity;
  }

  onBlur() {
    if (this.quantityControl.value == null) {
      this.quantityControl.setValue('1');
    }
  }
}
