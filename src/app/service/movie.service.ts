import { Injectable } from '@angular/core';
import dataMovieList from '../../ts/list/dataMovieList';
import { createMovie, Movie } from '../../ts/entities/Movie';
import { createComment } from '../../ts/entities/Comment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  protected movieList = dataMovieList;

  constructor() {}

  deleteComment(movieID: string, username: string) {
    const movie = this.getMovieByID(movieID);
    if (movie == null) {
      return;
    }
    const commentList = movie.commentList;
    let commentIndex = commentList.findIndex((comment) => {
      return comment.username == username;
    });
    if (commentIndex == -1) {
      return;
    }
    commentList.splice(commentIndex, 1);
  }

  addComment(
    movieID: string,
    username: string,
    score: number,
    content: string
  ) {
    const movie = this.getMovieByID(movieID);
    if (movie == null) {
      return;
    }
    const commentList = movie.commentList;
    let commentIndex = commentList.findIndex((comment) => {
      return comment.username == username;
    });
    if (commentIndex != -1) {
      commentList.splice(commentIndex, 1);
    }
    commentList.push(createComment(username, score, content));
  }

  getMovieByID(ID: string) {
    const movie = this.movieList.find((movie) => {
      return movie.ID == ID;
    });
    return movie || null;
  }

  getMovieList() {
    return this.movieList;
  }
}
