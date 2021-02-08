import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { blogPagination } from './blog/blog-pagination';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http :HttpClient) { }

  findPosts(page: number = 1){
    return this.http.get("http://localhost:8000/api/blog_posts?page="+ page).pipe(
      map(resultat => {
        return {
          items: resultat['hydra:member'],
          currentPage: page,
          pagesCount : this.getPageInUrl(resultat['hydra:view']['hydra:last'])
        } as blogPagination
      })
    );
  }

  private getPageInUrl(url: string) {
    const resultat = url.match(/page=(\d+)/);
    const page = +resultat[1];
    return page;
  }
}
