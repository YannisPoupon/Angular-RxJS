import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  template: ''
})
export class BaseComponent implements OnDestroy {
  protected subscritpions: Subscription[] = [];
  ngOnDestroy(){
    this.subscritpions.forEach(s => s.unsubscribe());
  }

  protected addSubscription(s: Subscription){
    this.subscritpions.push(s);
  }
}
