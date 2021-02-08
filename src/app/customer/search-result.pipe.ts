import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from './model/Customer';

@Pipe({
  name: 'searchResult'
})
export class SearchResultPipe implements PipeTransform {

  transform(customer: Customer, search: string = "") : string {
    const base = `${customer.fullName} (${customer.email})`
    if(!search){
      return base;
    }

    const regex = new RegExp (search, 'gi');

    return base.replace(regex, `<strong>$&</strong>`);
  }

}
