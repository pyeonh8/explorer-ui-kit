'use client';

import { useCallback, useState } from 'react';
import { UseCounterProps } from '@/types/hooks.types';

/**
 * 카운터 상태를 관리하고 제어하는 커스텀 훅
 *
 * @param options - 카운터 설정 옵션 객체
 * @param options.initialValue - 카운터의 시작 값 (기본값: 0)
 * @param options.min - 카운터가 내려갈 수 있는 최솟값 (기본값: -Infinity)
 * @param options.max - 카운터가 올라갈 수 있는 최댓값 (기본값: Infinity)
 *
 * @returns count - 현재 카운트된 숫자 상태
 * @returns increment - 숫자를 1 증가시키는 함수
 * @returns decrement - 숫자를 1 감소시키는 함수
 * @returns reset - 초기값으로 숫자를 리셋하는 함수
 */
const useCounter = (options: UseCounterProps = {}) => {
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
