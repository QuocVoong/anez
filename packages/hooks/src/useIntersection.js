import { useState, useRef, useEffect } from 'react';

const UnsupportedBehavior = {
  Ignore: 'Ignore',
  TreatAsIntersecting: 'TreatAsIntersecting',
};

function isSupported() {
  return (
    typeof window !== 'undefined'
    && 'IntersectionObserver' in window
    && 'IntersectionObserverEntry' in window
    && 'intersectionRatio' in IntersectionObserverEntry.prototype
  );
}

const emptyBoundingClientRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON: () => {
  }
};

export function useIntersection({
  root,
  rootMargin,
  threshold,
  unsupportedBehavior = UnsupportedBehavior.TreatAsIntersecting
}) {
  const node = useRef(null);
  const lastNode = useRef(null);
  const observer = useRef(null);
  const lastObserver = useRef(null);

  const [intersectionEntry, setIntersectingEntry] = useState(() => ({
    boundingClientRect: emptyBoundingClientRect,
    intersectionRatio: 0,
    intersectionRect: emptyBoundingClientRect,
    isIntersecting: false,
    rootBounds: emptyBoundingClientRect,
    target: null,
    time: Date.now()
  }));

  useEffect(() => {
    if (!isSupported()) {
      return;
    }

    const resolvedRoot = typeof root === 'string' ? document.querySelector(root) : root;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => setIntersectingEntry(entry),
      {
        root: resolvedRoot,
        rootMargin,
        threshold
      }
    );

    observer.current = intersectionObserver;

    return () => {
      intersectionObserver.disconnect();
    };
  }, [
    root,
    rootMargin,
    Array.isArray(threshold) ? threshold.join() : threshold
  ]);

  useEffect(() => {
    if (
      lastNode.current === node.current
      && lastObserver.current === observer.current
    ) {
      return;
    }

    lastNode.current = node.current;

    if (node.current == null) {
      return;
    }

    if (
      !isSupported()
      && unsupportedBehavior === UnsupportedBehavior.TreatAsIntersecting
    ) {
      const boundingClientRect = node.current.getBoundingClientRect();

      setIntersectingEntry({
        boundingClientRect,
        intersectionRatio: 1,
        intersectionRect: boundingClientRect,
        isIntersecting: true,
        rootBounds: boundingClientRect,
        target: node.current,
        time: Date.now()
      });

      return;
    }

    if (observer.current != null) {
      lastObserver.current = observer.current;
      observer.current.observe(node.current);
    }

    return () => {
      if (
        lastNode.current == null
        || lastObserver.current == null
        || (lastNode.current === node.current
          && lastObserver.current === observer.current)
      ) {
        return;
      }

      lastObserver.current.unobserve(lastNode.current);
    };
  });

  return [intersectionEntry, node];
}

export function useValueTracking(value, onChange) {
  const tracked = useRef(value);
  const oldValue = tracked.current;

  if (value !== oldValue) {
    tracked.current = value;
    onChange(value, oldValue);
  }
}
