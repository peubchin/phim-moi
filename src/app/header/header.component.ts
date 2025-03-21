import { Component } from '@angular/core';
import data from '../../ts/data';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // data = data;
  constructor(private userService: UserService) {}

  isAdmin() {
    return this.userService.isAdmin();
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }
}
