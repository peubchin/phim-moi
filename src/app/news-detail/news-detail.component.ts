import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { NewsService } from '../service/news.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { News } from '../../ts/entities/News';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, AppModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css',
})
export class NewsDetailComponent implements OnInit {
  newsDetail: News | undefined;
  
  constructor(
    // Để lấy ID
    private userService: UserService, //Kiểm tra xem người dùng có đăng nhập hay chưa
    private newsService: NewsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let ID = this.router.snapshot.params['ID'];
    this.newsDetail = this.newsService.getNewsByID(ID);
  }
}
