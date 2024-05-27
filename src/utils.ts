import { useEffect } from "react";

// 負の剰余のあまりを正にする
export const mod = (x: number, y: number) => (x * y < 0 ? (x % y) + y : x % y);

export const range = (start: number, end: number) =>
  [...Array(end - start)].map((_, i) => i + start);

export const useInterval = (callback: () => void, delay?: number | null) => {
  useEffect(() => {
    if (delay != null) {
      const id = setInterval(callback, delay, delay || 0);
      return () => clearInterval(id);
    }
  }, [callback, delay]);
};
