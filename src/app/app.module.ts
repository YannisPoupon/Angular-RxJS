import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { BlogComponent } from './blog/blog/blog.component';
import { ChronometreComponent } from './chronometre/chronometre.component';
import { CustomerModule } from './customer/customer.module';
import { CustomersXhrComponent } from './exercices/customers-xhr/customers-xhr.component';
import { Exercice2Component } from './exercices/exercice2/exercice2.component';
import { CacheModule } from './http/cache.module';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    ChronometreComponent,
    CustomersXhrComponent,
    Exercice2Component,
    BlogPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CustomerModule,
    CacheModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
