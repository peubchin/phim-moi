import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent {
  @Input()rate: number = 3.4;

  fraction(n: number) {
    return n - this.floor(n);
  }

  ceil(n: number) {
    return Math.ceil(n);
  }

  round(n: number) {
    return Math.round(n);
  }

  floor(n: number) {
    return Math.floor(n);
  }

  createArray(length: number) {
    return [...Array(length)];
  }
}
