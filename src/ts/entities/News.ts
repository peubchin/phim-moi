import { dateToString } from '../utility';
import { Rate } from './Rate';

export interface News {
  ID: string;
  title: string;
  content: string;
  imgURL: string;
  date: string;
  view: number;
  rateList: Rate[];
}

export function createNews(title = '', content = '', imgURL = '') {
  const news: News = {
    ID: `ne${new Date().getTime()}`,
    title,
    content,
    imgURL,
    date: dateToString(new Date()),
    view: 0,
    rateList: [],
  };
  return news;
}
