import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { map, switchMap } from 'rxjs/operators';
import { CustomerService } from '../customer.service';
import { ApiCustomer } from '../model/api-customer';
import { Customer } from '../model/Customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {

  customer: Customer;

  hasError = false;

  form = new FormGroup ({
    email : new FormControl,
    fullName : new FormControl
  });

  constructor(
    private service: CustomerService,
    private route: ActivatedRoute,
    private router : Router
  ) {}


  handleSubmit() {

    const customer : Customer = {...this.customer, ...this.form.value}

    this.service.update(customer).subscribe(
      // cas de réussite :
      () => this.router.navigateByUrl("/"),
      // Cas d'erreur :
      () => this.hasError = true
    );
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => +params.get("id")),
      switchMap(id => this.service.findById(id))
    ).subscribe(data => {
      this.customer = data
      this.form.patchValue(this.customer);
    })

  }



}
