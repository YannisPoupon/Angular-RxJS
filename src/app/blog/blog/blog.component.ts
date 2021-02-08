import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, map, switchMap, tap, throttleTime } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base-component';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent extends BaseComponent implements OnInit {

  blogPosts = [];
  isLoading: boolean = false;
  currentPage = 1;
  pagesCount: number = null;
  subscriptions: Subscription[];

  constructor(private http: HttpClient, private service: BlogService) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(fromEvent(window, 'scroll')
      .pipe(
        filter(() => this.canLoadMoreItems()),
        tap(() => (this.isLoading = true)),
        tap(() => this.currentPage++),
        switchMap(() => this.service.findPosts(this.currentPage)),
        tap((result) => console.log(result))
        // map(result => result.items)
      )
      .subscribe((result) => {
        this.isLoading = false;
        this.blogPosts.push(...result.items);
      }));

    this.addSubscription(this.service.findPosts().subscribe((resultat) => {
      this.blogPosts = resultat.items;
      this.currentPage = resultat.currentPage;
      this.pagesCount = resultat.pagesCount;
    }));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  private canLoadMoreItems() {
    return window.scrollY + window.innerHeight >= document.body.offsetHeight &&
    !this.isLoading && this.currentPage < this.pagesCount
  }
}
