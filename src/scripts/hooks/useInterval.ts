// Source - https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// Thanks Dan Abramov! :D

import { useEffect, useRef } from "react";

/**
 * A React safe way of running a callback on a set interval.
 * Written by Dan Abramov, who works on the React team.
 * Source - https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @param callback callback function to be run on an interval.
 * @param delay delay between each callback. Delay is in milliseconds.
 */
export const useInterval = (callback: () => unknown, delay: number) => {
  const savedCallback = useRef<any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
