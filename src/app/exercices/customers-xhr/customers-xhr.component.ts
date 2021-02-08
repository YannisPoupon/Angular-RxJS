import { ValueTransformer } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomHttpService } from '../custom-http.service';

@Component({
  selector: 'app-customers-xhr',
  templateUrl: './customers-xhr.component.html',
  styleUrls: ['./customers-xhr.component.scss'],
})
export class CustomersXhrComponent implements OnInit {
  constructor(private http: CustomHttpService) {}

  customers: any[] = [];

  ngOnInit(): void {
    this.http
      .get('http://localhost:8000/api/customers')
      .subscribe((result) => console.log(result));
  }
}
