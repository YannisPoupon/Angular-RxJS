import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomHttpService {
  constructor() {}

  private request<T>(url: string, params: RequestInit = {}) {
    return new Observable<T>((observer) => {
      window
        .fetch(url)
        .then( response => response.json())
        .then( json => {
          observer.next(json);
          observer.complete();
        })
        .catch( error => observer.error(error));
    });
  }

  get<T>(url: string) {
    return this.request<T>(url);
  }

  post<T>(url: string) {
    return this.request<T>(url, {
      method: 'POST'
    })
  }

  // get<T>(url: string) {
  //   const monObservable = new Observable<T>( (observer) => {
  //     const xhr = new XMLHttpRequest();

  //     xhr.open('GET', url);

  //     xhr.addEventListener('load', () => {
  //       const json = JSON.parse(xhr.responseText);

  //       observer.next(json);
  //       observer.complete();
  //     });

  //     xhr.send();
  //   });
  //   return monObservable;
  // }
}
