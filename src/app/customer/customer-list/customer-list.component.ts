
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer } from '../model/Customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];

  pagesCount = 1;

  currentPage = 1;

  customersSubscription: Subscription[] = [];

  constructor(private service : CustomerService) {}

  ngOnInit(): void {

   this.refreshCustomers(1);

  }

  ngOnDestroy() {
    this.customersSubscription.forEach(s => s.unsubscribe());
  }

  refreshCustomers(page){
    this.currentPage = page;
    const subscription = this.service.findAll(page).subscribe(data => {
      this.customers = data.items;
      this.pagesCount = data.pagesCount;
    });

    this.customersSubscription.push(subscription);
  }

  handleDelete(customer : Customer) {

    const oldCustomers = [...this.customers];
    this.customers = this.customers.filter(c => c !== customer)

    this.service.delete(customer).subscribe(
      () => {},
      () => {
        this.customers = oldCustomers;
        window.alert("une erreur est survenue");
      }
    )
  }
}
