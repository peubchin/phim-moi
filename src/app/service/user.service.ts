import { Injectable } from '@angular/core';
import dataUserList from '../../ts/list/dataUserList';
import { User, createUser } from '../../ts/entities/User';
import { MovieService } from './movie.service';
import { addMonthToDate, dateToString } from '../../ts/utility';
import { Bill, createBill } from '../../ts/entities/Bill';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected userList = dataUserList;
  private currentUsername = 'administrator';

  constructor(private movieService: MovieService) {}

  updateUser(
    name: string,
    username: string,
    email: string,
    phone: string,
    password: string
  ) {
    if (!this.isLoggedIn()) {
      return;
    }
    let userIndex = this.userList.findIndex((user) => {
      return user.username == this.currentUsername;
    });
    if (userIndex <= -1) {
      return;
    }
    this.movieService.getMovieList().forEach((movie) => {
      const commentList = movie.commentList;
      commentList.forEach((comment) => {
        if (comment.username == this.currentUsername) {
          comment.username = username;
        }
      });
    });
    this.currentUsername = username;
    this.userList[userIndex].name = name;
    this.userList[userIndex].username = username;
    this.userList[userIndex].email = email;
    this.userList[userIndex].phone = phone;
    this.userList[userIndex].password = password;
  }

  cancelBill() {
    const billList = this.getLoggedInUser().billList;
    if (billList.length == 0) {
      return;
    }
    const lastBill = billList.at(-1) as Bill;
    lastBill.canceledDate = dateToString(new Date());
  }

  addBill(packID: string, monthQuantity: number) {
    if (!this.billIsExpired()) {
      return;
    }
    const loggedInUser = this.getLoggedInUser();
    loggedInUser.billList.push(createBill(packID, monthQuantity));
  }

  getExpiredDate() {
    const billList = this.getLoggedInUser().billList;
    if (billList.length == 0) {
      return new Date();
    }
    const lastBill = billList.at(-1) as Bill;
    const expiredDate = addMonthToDate(
      new Date(lastBill.paidDate),
      lastBill.monthQuantity
    );
    return expiredDate;
  }

  billIsExpired() {
    const billList = this.getLoggedInUser().billList;
    if (billList.length == 0) {
      return true;
    }
    const lastBill = billList.at(-1) as Bill;
    const expiredDate = addMonthToDate(
      new Date(lastBill.paidDate),
      lastBill.monthQuantity
    );
    return (
      lastBill.canceledDate.length != 0 ||
      expiredDate.getTime() < new Date().getTime()
    );
  }

  billIsCanceled() {
    const billList = this.getLoggedInUser().billList;
    if (billList.length == 0) {
      return true;
    }
    const lastBill = billList.at(-1) as Bill;
    return lastBill.canceledDate.length != 0;
  }

  addFavouriteMovie(ID: string) {
    let index = this.getLoggedInUser().favouriteList.findIndex((item) => {
      return item == ID;
    });
    if (index > -1) {
      return;
    }
    this.getLoggedInUser().favouriteList.push(ID);
  }

  removeFavouriteMovie(ID: string) {
    let index = this.getLoggedInUser().favouriteList.findIndex((item) => {
      return item == ID;
    });
    if (index <= -1) {
      return;
    }
    this.getLoggedInUser().favouriteList.splice(index, 1);
  }

  getLoggedInUser() {
    if (!this.isLoggedIn()) {
      return createUser();
    }
    const loggedInUser = this.userList.find((user) => {
      return user.username == this.currentUsername;
    });

    return loggedInUser ? loggedInUser : createUser();
  }

  getUserList() {
    return this.userList;
  }

  logOut() {
    this.currentUsername = '';
  }

  logIn(username: string, password: string) {
    this.userList.some((user) => {
      if (!(user.username == username && user.password == password)) {
        return false;
      }
      this.currentUsername = user.username;
      return true;
    });
  }

  emailExistedExcept(email: string, exceptEmail: string) {
    return this.userList.some((user) => {
      return user.email == email && user.email != exceptEmail;
    });
  }

  usernameExistedExcept(username: string, exceptUsername: string) {
    return this.userList.some((user) => {
      return user.username == username && user.username != exceptUsername;
    });
  }

  emailExisted(email: string) {
    return this.userList.some((user) => {
      return user.email == email;
    });
  }

  usernameExisted(username: string) {
    return this.userList.some((user) => {
      return user.username == username;
    });
  }

  isAdmin() {
    return this.getLoggedInUser().isAdmin;
  }

  isLocked() {
    return this.getLoggedInUser().lock;
  }

  isLoggedIn() {
    return this.currentUsername.length != 0;
  }
}
