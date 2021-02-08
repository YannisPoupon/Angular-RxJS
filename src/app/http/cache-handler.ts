export interface CacheHandler {
  supports(url: string): boolean;
  getDuration(): number;
}
