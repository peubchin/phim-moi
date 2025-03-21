import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AppModule } from '../app.module';
import data from '../../ts/data';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ManageMovieComponent } from '../manage-movie/manage-movie.component';
import { ManageUserComponent } from '../manage-user/manage-user.component';

@Component({
  selector: 'app-manage-page',
  standalone: true,
  imports: [
    AppModule,
    CommonModule,
    ReactiveFormsModule,
    ManageMovieComponent,
    ManageUserComponent,
  ],
  templateUrl: './manage-page.component.html',
  styleUrl: './manage-page.component.css',
})
export class ManagePageComponent {}
