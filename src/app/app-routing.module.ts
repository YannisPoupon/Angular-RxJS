import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { BlogComponent } from './blog/blog/blog.component';
import { ChronometreComponent } from './chronometre/chronometre.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomersXhrComponent } from './exercices/customers-xhr/customers-xhr.component';
import { Exercice2Component } from './exercices/exercice2/exercice2.component';

const routes: Routes = [
  { path : '' , component : CustomerListComponent },
  { path : 'customers/:id' , component : CustomerFormComponent },
  { path : 'blog' , component : BlogComponent },
  { path : 'blog/:id' , component : BlogPostComponent },
  { path : 'chrono' , component : ChronometreComponent },
  { path : 'xhr' , component : CustomersXhrComponent },
  { path : 'exo2' , component : Exercice2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
