import { environment } from "src/environments/environment";
import { CacheHandler } from "../cache-handler";

export class CustomerHandler implements CacheHandler {
  supports(url: string): boolean {
    return url.search(/\/api\/customers/) >= 1;
  }
  getDuration(): number {
    return environment.cache.customers;
  }
}
