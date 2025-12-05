'use client';

import { useCallback, useState } from 'react';

interface UseCounterOptions {
  initialValue?: number;
  min?: number;
  max?: number;
}

interface UseCounter {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

/**
 * 카운터 상태를 관리하고 제어하는 훅
 * @param {number} [options.initialValue = 0] 카운터의 초기값.
 * @param {number} [options.min = -Infinity] 카운터의 최소값.
 * @param {number} [options.max = Infinity] 카운터의 최댓값.
 * @return {function} return.count - 카운터 값
 * @return {function} return.increment - 카운터 증가
 * @return {function} return.decrement - 카운터 감소
 * @return {function} return.reset - 카운터 리셋
 */
const useCounter = (options: UseCounterOptions = {}): UseCounter => {
  const { initialValue = 0, min = -Infinity, max = Infinity } = options;

  // 초기값이 유효한지 확인
  const effectiveInitialValue = Math.max(min, Math.min(max, initialValue));

  const [count, setCount] = useState(effectiveInitialValue);

  // 카운터 증가
  const increment = useCallback(() => {
    setCount((prevCount) => (prevCount < max ? prevCount + 1 : prevCount));
  }, [max]);

  // 카운터 감소
  const decrement = useCallback(() => {
    setCount((prevCount) => (prevCount > min ? prevCount - 1 : prevCount));
  }, [min]);

  // 카운터 초기값으로 리셋
  const reset = useCallback(() => {
    setCount(effectiveInitialValue);
  }, [effectiveInitialValue]);

  return { count, increment, decrement, reset };
};

export default useCounter;
