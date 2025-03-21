import { createUser, User } from './entities/User';
import dataMovieList from './list/dataMovieList';
import dataNewsList from './list/dataNewsList';
import dataUserList from './list/dataUserList';
import dataPackList from './list/dataPackList';

class Data {
  currentUserIndex: number = -1;
  movieList = dataMovieList;
  newsList = dataNewsList;
  packList = dataPackList;
  userList = dataUgitserList;

  updateUser(user: User) {
    if (!this.isLoggedIn()) {
      return;
    }
    this.userList.splice(this.currentUserIndex, 1, user);
    this.saveData();
  }

  addUser(name = '', username = '', email = '', phone = '', password = '') {
    this.userList.push(createUser(name, username, email, phone, password));
    this.saveData();
  }

  logOut() {
    this.currentUserIndex = -1;
    this.saveData();
  }

  logIn(username: string, password: string) {
    this.currentUserIndex = -1;
    this.userList.some((user: User, index: number) => {
      if (!(user.username == username && user.password == password)) {
        return false;
      }
      this.currentUserIndex = index;
      return true;
    });
    this.saveData();
  }

  isAdmin() {
    if (!this.isLoggedIn) {
      return false;
    }
    return this.getCurrentUser().username == 'admin';
  }

  getCurrentUser() {
    if (!this.isLoggedIn()) {
      return createUser();
    }
    return this.userList[this.currentUserIndex];
  }

  isLoggedIn() {
    return (
      this.currentUserIndex >= 0 && this.currentUserIndex < this.userList.length
    );
  }

  saveData() {
    localStorage.setItem('dataNhom2HIL', JSON.stringify(this));
  }
}

function getData() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const stringData = localStorage.getItem('dataNhom2HIL');
    if (stringData != null) {
      const data = Object.setPrototypeOf(
        JSON.parse(stringData),
        Data.prototype
      );
      return data as Data;
    }
  }
  return new Data();
}

const data = getData();
// console.log(data);

export default data;
