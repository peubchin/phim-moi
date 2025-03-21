import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface paginationInfo {
  length: number;
  itemsPerPage: number;
  currentPage: number;
}


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() pgntInfo: paginationInfo = {
    length: 100,
    itemsPerPage: 10,
    currentPage: 1,
  };
  @Output() change = new EventEmitter<paginationInfo>();

  process() {
    this.change.emit(this.pgntInfo);
  }

  ngOnInit() {
    console.log(1);
  }

  getPageQuantity() {
    return Math.ceil(this.pgntInfo.length / this.pgntInfo.itemsPerPage);
  }

  back() {
    this.pgntInfo.currentPage -= 1;
    if (this.pgntInfo.currentPage < 0) {
      this.pgntInfo.currentPage = 0;
    }
  }

  doubleBack() {
    this.pgntInfo.currentPage -= 2;
    if (this.pgntInfo.currentPage < 0) {
      this.pgntInfo.currentPage = 0;
    }
  }

  next() {
    this.pgntInfo.currentPage += 1;
    if (this.pgntInfo.currentPage > this.getPageQuantity()) {
      this.pgntInfo.currentPage = this.getPageQuantity();
    }
  }

  doubleNext() {
    this.pgntInfo.currentPage += 2;
    if (this.pgntInfo.currentPage > this.getPageQuantity()) {
      this.pgntInfo.currentPage = this.getPageQuantity();
    }
  }

  skipToEnd() {
    this.pgntInfo.currentPage = this.getPageQuantity();
  }

  skipToStart() {
    this.pgntInfo.currentPage = 0;
  }
}
