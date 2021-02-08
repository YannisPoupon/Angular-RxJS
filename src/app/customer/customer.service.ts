import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Customer } from './model/Customer';
import { ApiCustomer } from './model/api-customer';
import { CacheService } from '../cache.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient, private cache: CacheService) {}

  mapApiCustomerToCustomer(apiCustomer: ApiCustomer): Customer {
    return {
      id: apiCustomer.id,
      email: apiCustomer.email,
      fullName: apiCustomer.firstName + ' ' + apiCustomer.lastName,
      invoices: apiCustomer.invoices,
    } as Customer;
  }

  findById(id: number) {
    return this.http
      .get<ApiCustomer>('http://localhost:8000/api/customers/' + id)
      .pipe(map(this.mapApiCustomerToCustomer));
  }

  findAll(page = 1) {
    // if (this.cache.has('customers.list')) {
    //   return of(this.cache.get('customers.list'));
    // }
    return this.http.get('http://localhost:8000/api/customers?page=' + page).pipe(
    map(data => {
      return {
        items: (data["hydra:member"] as ApiCustomer[]).map(this.mapApiCustomerToCustomer),
        currentPage: page,
        pagesCount : this.getPageInUrl(data['hydra:view']['hydra:last'])
      }
    })
    // tap(data => console.log(data)),
    // map((data) => {
    //     return data['hydra:member'] as ApiCustomer[];
    //   }),
    //   map((apiCustomer) => {
    //     return apiCustomer.map(this.mapApiCustomerToCustomer);
    //   }),
    //   tap((customers) => this.cache.set('customers.list', customers))
     );
  }

  private getPageInUrl(url: string) {
    const resultat = url.match(/page=(\d+)/);
    const page = +resultat[1];
    return page;
  }

  update(customer: Customer) {
    // const firstName = infos[0];
    // const lastName = infos[1];
    const [firstName, lastName] = customer.fullName.split(' ');

    //destructuring : lorsque l'on met un tableau ou un objet a gauche du tableau !ordre important!

    const apiCustomer: ApiCustomer = {
      firstName, //firstName: firstName,
      lastName, //lastName: lastName,
      email: customer.email,
    };

    return this.http
      .put<ApiCustomer>(
        'http://localhost:8000/api/customers/' + customer.id,
        apiCustomer
      )
      .pipe(
        map(this.mapApiCustomerToCustomer),
        tap(()=> this.cache.invalidate('customer.list'))
        );
  }

  delete(customer: Customer) {
    return this.http.delete<ApiCustomer>(
      'http://localhost:8000/api/customers/' + customer.id
    );
  }

  search(value: string) {
    return this.http
      .get<ApiCustomer[]>(
        'http://localhost:8000/api/customers/search?q=' + value
      )
      .pipe(
        map((resultat) => resultat['hydra:member'] as ApiCustomer[]),
        map((apiCustomers) => apiCustomers.map(this.mapApiCustomerToCustomer))
      );
  }
}
