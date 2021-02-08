import { CacheHandler } from "../cache-handler";

export class BlogHandler implements CacheHandler {
  supports(url: string): boolean {
    return url.search(/\/api\/blog/) >= 1;
  }
  getDuration(): number {
    return 120;
  }
}
