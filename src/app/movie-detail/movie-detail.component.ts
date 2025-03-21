import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createMovie, Movie } from '../../ts/entities/Movie';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../service/movie.service';
import { AppModule } from '../app.module';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, AppModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  form = new FormGroup({
    score: new FormControl(0, [Validators.required, Validators.min(1)]),
    content: new FormControl(''),
  });
  formMessage = '';
  commentQuantity: number = 0;
  itemsPerPage: number = 5;
  productDetel: Movie = createMovie();

  constructor(
    private userService: UserService,
    private movieService: MovieService,
    private router: Router,
    private activatedRout: ActivatedRoute
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
    this.commentQuantity = this.itemsPerPage;
    let ID = this.activatedRout.snapshot.params['ID'];
    this.productDetel = this.movieService.getMovieByID(ID) || createMovie();
    let commentIndex = this.getCommentIndex();
    if (commentIndex == -1) {
      return;
    }
    const commentList = this.productDetel.commentList;
    const comment = commentList[commentIndex];
    this.form.controls.score.setValue(comment.score);
    this.form.controls.content.setValue(comment.content);
  }

  getCommentList() {
    return this.productDetel.commentList
      .slice(0)
      .reverse()
      .slice(0, this.commentQuantity);
  }

  needShowCollapse() {
    return this.commentQuantity > this.itemsPerPage;
  }

  needShowSeeMore() {
    return this.productDetel.commentList.length > this.commentQuantity;
  }

  collapse() {
    this.commentQuantity = this.itemsPerPage;
  }

  seeMore() {
    this.commentQuantity += this.itemsPerPage;
  }

  submit() {
    if (this.form.controls.score.invalid) {
      this.formMessage = 'Hãy đánh số sao';
      return;
    }
    if (
      this.form.controls.score.pristine &&
      this.form.controls.content.pristine
    ) {
      return;
    }
    this.form.markAsPristine();
    this.formMessage = '';
    this.movieService.addComment(
      this.productDetel.ID,
      this.userService.getLoggedInUser().username,
      Number(this.form.value.score),
      String(this.form.value.content)
    );
  }

  deleteComment() {
    this.form.reset();
    this.form.controls.score.setValue(0);
    this.form.controls.content.setValue('');
    this.movieService.deleteComment(
      this.productDetel.ID,
      this.userService.getLoggedInUser().username
    );
  }

  getCommentIndex() {
    const commentList = this.productDetel.commentList;
    const commentIndex = commentList.findIndex((comment) => {
      return comment.username == this.userService.getLoggedInUser().username;
    });
    return commentIndex;
  }

  isCommented() {
    return this.getCommentIndex() != -1;
  }

  changeScore(n: number) {
    this.form.controls.score.markAsDirty();
    this.form.controls.score.setValue(n);
  }

  getAvgScore() {
    if (!this.productDetel || this.productDetel.commentList.length == 0) {
      return 0;
    }
    let score = 0;
    this.productDetel.commentList.forEach((comment) => {
      score += comment.score;
    });
    return score / this.productDetel.commentList.length;
  }

  getInt(s: any) {
    return parseInt(s);
  }
}
