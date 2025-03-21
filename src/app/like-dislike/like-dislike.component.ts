import { Component } from '@angular/core';

@Component({
  selector: 'app-like-dislike',
  templateUrl: './like-dislike.component.html',
  styleUrl: './like-dislike.component.css',
})
export class LikeDislikeComponent {
  // Like & Dislike
  isLiked = false;
  isDisliked = false;

  toggleLike() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.isDisliked = false; // Đặt Dislike về false khi Like được chọn
    }
  }

  toggleDislike() {
    this.isDisliked = !this.isDisliked;
    if (this.isDisliked) {
      this.isLiked = false; // Đặt Like về false khi Dislike được chọn
    }
  }
}
