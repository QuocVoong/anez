export const MAX_MAP_ENTRIES = 50;

export default function memoize(method, resolver) {
  const weakMapCache = new WeakMap();
  const mapCache = new Map();
  const mapKeys = [];

  return function memoized(...args) {
    if (typeof window === 'undefined') {
      return method.apply(this, args);
    }

    const useWeakMap =
      args.length === 1 && typeof args[0] === 'object' && !resolver;

    let key;
    if (useWeakMap) {
      key = args[0];
    } else if (resolver && resolver instanceof Function) {
      key = resolver(...args);
    } else {
      key = args[0];
    }

    const cache = useWeakMap ? weakMapCache : mapCache;
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = method.apply(this, args);

    if (useWeakMap) {
      weakMapCache.set(key, result);
    } else {
      mapCache.set(key, result);
      mapKeys.push(key);

      if (mapCache.size > MAX_MAP_ENTRIES) {
        const oldestKey = mapKeys[0];
        mapCache.delete(oldestKey);
        mapKeys.shift();
      }
    }

    return result;
  };
}