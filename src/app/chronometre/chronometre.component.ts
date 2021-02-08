import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-chronometre',
  templateUrl: './chronometre.component.html',
  styleUrls: ['./chronometre.component.scss'],
})
export class ChronometreComponent implements OnInit, OnDestroy {

  intervalSubscription: Subscription;
  i:number;

  constructor() {}

  ngOnInit(): void {

    this.i = 0;

    if (!this.intervalSubscription) {
      this.intervalSubscription = interval(1000).subscribe(() => {
        console.log('chrono :  ' + this.i);
        this.i++;
      });
    }
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}
