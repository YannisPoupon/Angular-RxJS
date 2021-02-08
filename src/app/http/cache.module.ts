import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CacheInterceptor, CACHE_HANDLERS_INJECTIONTOKEN } from "../cache.interceptor";
import { BlogHandler } from "./handlers/blog-handler";
import { CustomerHandler } from "./handlers/customer-handler";

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: CACHE_HANDLERS_INJECTIONTOKEN,
     useClass: CustomerHandler,
    multi: true
  },
  { provide: CACHE_HANDLERS_INJECTIONTOKEN,
    useClass: BlogHandler,
    multi: true
 },
  ]
})
export class CacheModule {

};
