import { dateToString } from '../utility';
import { Comment } from './Comment';

export interface Movie {
  ID: string;
  name: string;
  duration: number;
  date: string;
  imgURL: string;
  trailerURL: string;
  certificate: string;
  nation: string;
  producerList: string[];
  directorList: string[];
  castList: string[];
  categoryList: string[];
  view: number;
  description: string;
  commentList: Comment[];
}

export function createMovie(
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
  const movie: Movie = {
    ID: `mo${new Date().getTime()}`,
    name,
    date: dateToString(new Date()),
    duration,
    imgURL,
    trailerURL,
    certificate,
    nation,
    producerList,
    directorList,
    castList,
    categoryList,
    description,
    view: 0,
    commentList: [],
  };
  return movie;
}
