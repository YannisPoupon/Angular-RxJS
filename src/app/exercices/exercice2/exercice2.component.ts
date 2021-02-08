import { Component, OnInit } from '@angular/core';
import { AbstractWebDriver } from 'protractor/built/browser';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-exercice2',
  templateUrl: './exercice2.component.html',
  styleUrls: ['./exercice2.component.scss'],
})
export class Exercice2Component implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let count = 0;
    const observable = new Observable((observer) => {
      const users = [
        { name: 'Joseph', score: 100 },
        { name: 'Yannis', score: 200 },
        { name: 'Jules', score: 150 },
        { name: 'Lior', score: 45 },
        { name: 'Jordan', score: 233 },
        { name: 'Xavier', score: 120 },
        { name: 'Damien', score: 90 },
        { name: 'Hugo', score: 112 },
      ];

      let sortedUsers = users.sort((a, b) =>  b.score - a.score)

      let index = 0;

      const intervalId = setInterval(() => {
        if (index === sortedUsers.length) {
          clearInterval(intervalId);
          observer.complete();
          return;
        }

        observer.next(sortedUsers[index]);
        index++;
        // observer.complete
      }, 500);
    });

    observable.pipe(
      filter((value:{score:number, name:string}) => value.score > 100),
      map((value) => value.name.toUpperCase())
    ).subscribe(
      (value) => console.log(value),
      (error) => console.log(error),
      () => console.log('Fini !')
    );
  }
}
