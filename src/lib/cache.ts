import { chain, startsWith } from 'lodash';

interface ICacheEntry<T> {
  expiresAt: number;
  value: T;
}

export class Cache {
  public static prefix = 'cache';

  /**
   * Remember the result of an expensive computation or data fetching, during a
   * certain period. The result is identified by a unique key.
   * @param key Key at which to store the result of the computation
   * @param lifespan How long, in second, to store the item
   * @param computer The method that computes the value, if not in the cache
   */
  public static async remember<T = any>(
    key: string,
    lifespan: number,
    computer: () => Promise<T>
  ): Promise<T> {
    const cached = Cache.get<T>(key);

    if (cached) {
      if (Date.now() < cached.expiresAt) {
        return cached.value;
      }

      Cache.forget(key);
    }

    const value = await computer();
    Cache.put(key, value, lifespan);
    return value;
  }

  /**
   * Retrieve an item from the cache
   * @param key Key at which the item is stored
   */
  public static get<T = any>(key: string): ICacheEntry<T> {
    const item = localStorage.getItem(Cache.getPrefixedKey(key));

    try {
      return JSON.parse(item);
    } catch (error) {
      // Do nothing
    }

    return null;
  }

  /**
   * Put an item into the cache
   * @param key Key at which to store the cached item
   * @param value Item to cache
   * @param lifespan How long, in seconds, we want to keep the item
   */
  public static put(key: string, value: any, lifespan: number) {
    localStorage.setItem(
      Cache.getPrefixedKey(key),
      JSON.stringify({
        expiresAt: Date.now() + lifespan * 1000,
        value,
      })
    );
  }

  /**
   * Forget a cached item
   * @param key Key at which the item is stored
   */
  public static forget(key: string) {
    localStorage.removeItem(Cache.getPrefixedKey(key));
  }

  /**
   * Flush the whole cache
   */
  public static flush() {
    Cache.getCacheKeys().forEach(Cache.forget);
  }

  /**
   * Flush all the expired entries from the cache
   */
  public static flushExpired() {
    Cache.getCacheKeys()
      .filter(key => Cache.get(key).expiresAt < Date.now())
      .forEach(Cache.forget);
  }

  /**
   * Return a prefixed key
   * @param key
   */
  private static getPrefixedKey(key: string) {
    if (Cache.isPrefixed(key)) {
      return key;
    }

    return `${Cache.prefix}:${key}`;
  }

  /**
   * Return whether a key is already prefixed or not
   * @param key
   */
  private static isPrefixed(key: string) {
    return startsWith(key, `${Cache.prefix}:`);
  }

  /**
   * Return all the keys stored in the cache
   */
  private static getCacheKeys() {
    const cachePrefix = `${Cache.prefix}:`;
    return chain(localStorage)
      .keys()
      .filter(key => startsWith(key, cachePrefix))
      .value();
  }
}
