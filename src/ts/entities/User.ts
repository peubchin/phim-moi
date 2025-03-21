import { Bill } from './Bill';

export interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  lock: boolean;
  isAdmin: boolean;
  favouriteList: string[];
  billList: Bill[];
}

export function createUser(
  name = '',
  username = '',
  email = '',
  phone = '',
  password = ''
) {
  const user: User = {
    name,
    username,
    email,
    phone,
    password,
    lock: false,
    isAdmin: false,
    favouriteList: [],
    billList: [],
  };
  return user;
}
