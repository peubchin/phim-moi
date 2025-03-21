import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { MovieService } from './movie.service';
import { createUser } from '../../ts/entities/User';
import { createMovie } from '../../ts/entities/Movie';
import { using } from 'rxjs';
import { NewsService } from './news.service';

@Injectable({
  providedIn: 'root',
})
export class ManageService {
  private rootUsername = 'administrator';

  constructor(
    private userService: UserService,
    private movieService: MovieService,
    private newsService: NewsService
  ) {}

  updateUserByAdmin(
    oldUsername: string,
    name: string,
    username: string,
    email: string,
    phone: string,
    password: string,
    isAdmin: boolean
  ) {
    let userIndex = this.getUserIndex(oldUsername);
    if (userIndex <= -1) {
      return;
    }
    this.movieService.getMovieList().forEach((movie) => {
      const commentList = movie.commentList;
      commentList.forEach((comment) => {
        if (comment.username == oldUsername) {
          comment.username = username;
        }
      });
    });
    this.newsService.getNewsList().forEach((news) => {
      const commentList = news.rateList;
      commentList.forEach((rate) => {
        if (rate.username == oldUsername) {
          rate.username = username;
        }
      });
    });
    const updatedUser = this.userService.getUserList()[userIndex];
    if (oldUsername == this.getRootUsername()) {
      this.rootUsername = username;
    }
    if (oldUsername == this.userService.getLoggedInUser().username) {
      let isLocked = updatedUser.lock;
      if (isLocked) {
        updatedUser.lock = false;
      }
      updatedUser.username = username;
      this.userService.logIn(username, password);
      if (isLocked) {
        updatedUser.lock = true;
      }
    }
    updatedUser.name = name;
    updatedUser.username = username;
    updatedUser.email = email;
    updatedUser.phone = phone;
    updatedUser.password = password;
    updatedUser.isAdmin = isAdmin;
  }

  deleteUser(username: string) {
    let userIndex = this.getUserIndex(username);
    if (userIndex == -1) {
      return;
    }
    this.userService.getUserList().splice(userIndex, 1);
    this.movieService.getMovieList().forEach((movie) => {
      movie.commentList = movie.commentList.filter((comment) => {
        return comment.username != username;
      });
    });
    this.newsService.getNewsList().forEach((news) => {
      news.rateList = news.rateList.filter((rate) => {
        return rate.username != username;
      });
    });
  }

  addUserByAdmin(
    name: string,
    username: string,
    email: string,
    phone: string,
    password: string,
    isAdmin: boolean
  ) {
    const user = createUser(name, username, email, phone, password);
    user.isAdmin = isAdmin;
    this.userService.getUserList().push(user);
  }

  unlockUser(username: string) {
    if (username == this.rootUsername) {
      return;
    }
    let userIndex = this.getUserIndex(username);
    if (userIndex == -1) {
      return;
    }
    this.userService.getUserList()[userIndex].lock = false;
  }

  lockUser(username: string) {
    if (username == this.rootUsername) {
      return;
    }
    let userIndex = this.getUserIndex(username);
    if (userIndex == -1) {
      return;
    }
    this.userService.getUserList()[userIndex].lock = true;
  }

  getRootUsername() {
    return this.rootUsername;
  }

  getUser(username: string) {
    let userIndex = this.getUserIndex(username);
    if (userIndex == -1) {
      return createUser();
    }
    return this.userService.getUserList()[userIndex];
  }

  getUserIndex(username: string) {
    return this.userService.getUserList().findIndex((user) => {
      return user.username == username;
    });
  }

  updateMovie(
    ID: string,
    name = '',
    certificate = '',
    duration = 0,
    imgURL = '',
    trailerURL = '',
    date = '',
    nation = '',
    producerList: string[] = [],
    directorList: string[] = [],
    castList: string[] = [],
    categoryList: string[] = [],
    description = ''
  ) {
    const movie = this.movieService.getMovieByID(ID);
    if (movie == null) {
      return;
    }
    movie.name = name;
    movie.certificate = certificate;
    movie.duration = duration;
    // movie.imgURL = imgURL;
    // movie.trailerURL = trailerURL;
    movie.date = date;
    movie.nation = nation;
    movie.producerList = producerList;
    movie.directorList = directorList;
    movie.castList = castList;
    movie.categoryList = categoryList;
    movie.description = description;
  }

  addMovie(
    name = '',
    certificate = '',
    duration = 0,
    imgURL = '',
    trailerURL = '',
    date = '',
    nation = '',
    producerList: string[] = [],
    directorList: string[] = [],
    castList: string[] = [],
    categoryList: string[] = [],
    description = ''
  ) {
    const movie = createMovie(
      name,
      certificate,
      duration,
      imgURL,
      trailerURL,
      date,
      nation,
      producerList,
      directorList,
      castList,
      categoryList,
      description
    );
    this.movieService.getMovieList().push(movie);
  }

  deleteMovie(ID: string) {
    let movieIndex = this.movieService.getMovieList().findIndex((movie) => {
      return movie.ID == ID;
    });
    if (movieIndex == -1) {
      return;
    }
    this.movieService.getMovieList().splice(movieIndex, 1);
    this.userService.getUserList().forEach((user) => {
      user.favouriteList = user.favouriteList.filter((item) => {
        return item != ID;
      });
    });
  }

  addUser(name = '', username = '', email = '', phone = '', password = '') {
    this.userService
      .getUserList()
      .push(createUser(name, username, email, phone, password));
  }
}
