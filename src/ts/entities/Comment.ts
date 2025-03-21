import { dateToString } from '../utility';

export interface Comment {
  username: string;
  date: string;
  score: number;
  content: string;
}

export function createComment(username = '', score = 0, content = '') {
  const comment = {
    username,
    date: dateToString(new Date()),
    score,
    content,
  };
  return comment;
}
