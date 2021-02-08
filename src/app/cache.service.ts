import { Injectable } from '@angular/core';

export interface CacheItem {
  value: any;
  initialTime: number;
  duration: number;
}

export interface CacheStorage {
  [key: string]: CacheItem;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  storage: CacheStorage = {};

  constructor() {}

  set(key: string, value: any, duration = 60) {
    this.storage[key] = {
      value: value,
      initialTime: Date.now(),
      duration: duration * 1000,
    };
  }

 invalidate(key: string) {
   delete this.storage[key];
 }

  get(key: string) {
    if (!this.has(key)) {
      null;
    }
    return this.storage[key].value || null;
  }

  has(key: string) {
    if (!this.storage[key]) {
      return false;
    }

    const item = this.storage[key];

    const now = Date.now();
    const expiration = item.initialTime + item.duration;

    return now < expiration;
  }
}
