import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PaginationComponent } from "../pagination/pagination.component";
import { CustomerFormComponent } from "./customer-form/customer-form.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { SearchCustomerComponent } from "./search-customer/search-customer.component";
import { SearchResultPipe } from "./search-result.pipe";

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerFormComponent,
    SearchCustomerComponent,
    SearchResultPipe,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    CustomerListComponent
  ]
})
export class CustomerModule {

}
