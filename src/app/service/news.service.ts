import { Injectable } from '@angular/core';
import dataNewsList from '../../ts/list/dataNewsList';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  protected newsList = dataNewsList;

  constructor() {}

  getNewsByID(ID: string) {
    return this.newsList.find((news) => {
      return news.ID == ID;
    });
  }

  getNewsList() {
    return this.newsList;
  }
}
