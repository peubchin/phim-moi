import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AppModule } from '../app.module';
import { Router, RouterLink } from '@angular/router';
import select from '../../ts/select';
import { Movie } from '../../ts/entities/Movie';
import { MovieService } from '../service/movie.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [CommonModule, AppModule, RouterLink],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.css',
})
export class MoviePageComponent implements OnInit {
  currentIdx = -1;
  movies: Movie[] = [];
  searching: string = '';
  selectedCategory: string = '';

  constructor(
    private userService: UserService,
    private movieService: MovieService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      alert('Vui lòng đăng nhập!');
      this.router.navigateByUrl('/login-page');
      return;
    }
    if (this.userService.isLocked()) {
      alert('Tài khoản đã bị khóa');
      this.router.navigateByUrl('/login-page');
      return;
    }
    if (!this.userService.isAdmin() && this.userService.billIsExpired()) {
      alert('Vui lòng mua gói!');
      this.router.navigateByUrl('/pack-page');
      return;
    }
    this.movies = this.movieService.getMovieList();
    select.run(this.document);
  }

  getFavouriteList() {
    const favouriteList: Movie[] = [];
    this.userService.getLoggedInUser()?.favouriteList.forEach((ID) => {
      const movie = this.movieService.getMovieByID(ID);
      if (movie) {
        favouriteList.push(movie);
      }
    });
    return favouriteList;
  }

  removeFavourite(ID: string) {
    this.userService.removeFavouriteMovie(ID);
  }

  addToFavourite(ID: string) {
    this.userService.addFavouriteMovie(ID);
  }

  sortByDate() {
    this.movies.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  sortByViews() {
    this.movies.sort((a, b) => b.view - a.view);
  }

  // Lọc theo thể loại
  filterByCategory(category: string) {
    this.currentPage = 1;
    this.selectedCategory = category;
    this.movies = this.movieService.getMovieList();
    if (category) {
      this.movies = this.movies.filter((movie) =>
        movie.categoryList.includes(category)
      );
    }
  }

  onSortChange(event: Event) {
    const sortType = (event.target as HTMLSelectElement).value;
    if (sortType === 'latest') {
      this.sortByDate();
    } else if (sortType === 'mostViewed') {
      this.sortByViews();
    }
  }

  // search ne
  filterResults() {
    let str = this.searching;
    if (!str) {
      this.movies = this.movieService.getMovieList();
      return;
    }
    str = str.trim().toLowerCase();
    this.movies = this.movies.filter(function (searching) {
      if (searching.name.toLowerCase().indexOf(str) !== -1) {
        return true;
      }
      return false;
    });
  }

  // Pagination ne
  currentPage: number = 1;
  itemsPerPage: number = 4;

  getMovieList() {
    if (this.currentPage > this.getTotalPages()) {
      this.currentPage = this.getTotalPages();
    }
    const startIdx = (this.currentPage - 1) * this.itemsPerPage;
    const endIdx = startIdx + this.itemsPerPage;
    return this.movies.slice(startIdx, endIdx);
  }

  getTotalPages() {
    return Math.ceil(this.movies.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }
}
