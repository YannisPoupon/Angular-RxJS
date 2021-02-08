import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pipe } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit {
  post: any;
  id: number;
  error: boolean = false;
  errorMessage :string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => +params.get('id')),
      tap(id => this.id = id),
      switchMap(id => this.http.get('http://localhost:8000/api/blog_posts/' +id))
    ).subscribe(
      result => this.post = result,
        error => {
        this.error = true
        this.errorMessage = "Nous n'avous pas trouvé cet article"
      }
      );

  }
}
