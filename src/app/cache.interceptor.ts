import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { CacheHandler } from './http/cache-handler';

export const CACHE_HANDLERS_INJECTIONTOKEN = new InjectionToken<CacheHandler[]>(
  'Liste des cacheHandlers pour l\'intercepteur',
  { factory: () => [] }
);

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(
    private cache: CacheService,
    // @Optional()
    @Inject(CACHE_HANDLERS_INJECTIONTOKEN)
    private handlers: CacheHandler[] = []
  ) {
    console.log(this.handlers);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let durationOfCache = 60;

    // const handler1 = {
    //   supports(url: string): boolean {
    //     return url.search(/\/api\/customers/) >= 1;
    //   },

    //   getTime() {
    //     return 50;
    //   },
    // };

    // const handler2 = {
    //   supports(url: string): boolean {
    //     return url.search(/\/api\/blog/) >= 1;
    //   },

    //   getTime() {
    //     return 200;
    //   },
    // };

    // const handlers = [handler1, handler2];

    for (const handler of this.handlers) {
      if (!handler.supports(request.url)) {
        continue;
      }
      durationOfCache = handler.getDuration();
      break;
    }

    console.log(durationOfCache)

    // console.log(durationOfCache);

    /* console.log(handler1.supports('http://localhost:8000/api/customers/12')); */
    /* console.log(handler1.supports('http://localhost:8000/apii/customers/12')); */

    if (this.cache.has(request.url)) {
      // retourner l'objet dans le cache sous la forme d'une réponse HTTP
      return of(this.cache.get(request.url));
    }

    return next.handle(request).pipe(
      tap((value) => {
        if (value instanceof HttpResponse) {
          this.cache.set(request.url, value, durationOfCache);
        }
      })
    );
  }
}
