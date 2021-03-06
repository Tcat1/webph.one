import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

export interface DirectoryItemI {
  number: number;
  title: string;
  subtitle?: string;
  _id?: string;
}
export interface DirectoryI {
  title: string;
  items: DirectoryItemI[];
}

@Injectable()
/**
 * Simple service, only get direcrory array form directory.json
 */
export class DirectoryService {
  obs: Observable<DirectoryI[]>;
  directoryLoaded: DirectoryI[];

  constructor(_http: Http) {
      this.obs = _http.get('directory.json')
      .map(response => response.json())
      .do(res => this.directoryLoaded = res)
      .do(console.log);
  }

  get(): Observable<DirectoryI[]> {
    return (typeof this.directoryLoaded !== 'undefined') ? Observable.of(this.directoryLoaded) : this.obs;
  }
}
