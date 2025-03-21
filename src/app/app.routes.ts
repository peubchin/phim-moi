import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { PackPageComponent } from './pack-page/pack-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { ManagePageComponent } from './manage-page/manage-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'sign-up-page',
    component: SignUpPageComponent,
  },
  {
    path: 'login-page',
    component: LoginPageComponent,
  },
  {
    path: 'movie-page',
    component: MoviePageComponent,
  },
  {
    path: 'movie-detail/:ID',
    component: MovieDetailComponent,
  },
  {
    path: 'news-page',
    component: NewsPageComponent,
  },
  {
    path: 'news-detail/:ID',
    component: NewsDetailComponent,
  },
  {
    path: 'pack-page',
    component: PackPageComponent,
  },
  {
    path: 'account-page',
    component: AccountPageComponent,
  },
  {
    path: 'manage-page',
    component: ManagePageComponent,
  },
];
