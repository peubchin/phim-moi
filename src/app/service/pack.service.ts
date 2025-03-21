import { Injectable } from '@angular/core';
import dataPackList from '../../ts/list/dataPackList';

@Injectable({
  providedIn: 'root',
})
export class PackService {
  protected packList = dataPackList;

  constructor() {}

  getPackList() {
    return this.packList;
  }
}
