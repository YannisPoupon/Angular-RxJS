import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { CustomerService } from '../customer.service';
import { Customer } from '../model/Customer';
import { SearchResultPipe } from '../search-result.pipe';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.scss']
})
export class SearchCustomerComponent implements OnInit {


  searchInput = new FormControl;

  resultats : Customer[] = [];

  constructor(private service : CustomerService) { }

  ngOnInit(): void {
    this.searchInput.valueChanges
    .pipe(
      debounceTime(400),
      tap(value => {this.resultats = value.length === 0 && []}
      ),
      filter(value => value.length > 0),
      switchMap( value => this.service.search(value))
    )
    .subscribe(resultats => this.resultats = resultats);
  }
}
