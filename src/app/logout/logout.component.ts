import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
  @Output() loggedOut = new EventEmitter<number>();

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    const modal = this.document.querySelector('#logout') as HTMLElement;
    const subminBTN = this.document.querySelector('#subminBTN') as HTMLElement;
    modal.addEventListener('shown.bs.modal', () => {
      subminBTN.focus();
    });
  }

  onSubmit() {
    this.userService.logOut();
    this.loggedOut.emit();
    this.router.navigateByUrl('login-page');
  }
}
