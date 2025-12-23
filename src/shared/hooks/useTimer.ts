'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { UseTimerProps } from '@/types/hooks.types';

/**
 * 타이머를 관리하고 제어하는 훅
 * 카운트다운 방식으로 작동하며, 0에 도달하면 자동으로 정지합니다.
 *
 * @param options.initialValue - 타이머의 초기값 (카운트다운 시작 값, 초기값 = 10)
 * @param options.delay - 카운트가 감소하는 시간 간격 (밀리초, 초기값= 1000 ms)
 * @param options.onComplete - 타이머가 0에 도달하여 정지될 때 실행할 콜백 함수
 *
 * @returns timerCount - 현재 타이머 값
 * @returns isRunning - 타이머 동작 상태
 * @returns start - 타이머 시작 함수
 * @returns pause - 타이머 정지 함수
 * @returns reset - 타이머 초기화 함수
 */
const useTimer = (options: UseTimerProps = {}) => {
  const {
    initialValue = 10,
    delay = 1000,
    max = Infinity,
    onComplete,
  } = options;

  // 초기값이 유효한지 확인
  const min = 0;
  const effectiveInitialValue = Math.max(min, Math.min(max, initialValue));

  const [timerCount, setTimerCount] = useState(effectiveInitialValue);
  const [isRunning, setIsRunning] = useState(false);
  const onCompleteRef = useRef(onComplete);

  // 타이머 시작
  const start = useCallback(() => setIsRunning(true), []);

  // 타이머 정지
  const pause = useCallback(() => setIsRunning(false), []);

  // 타이머 리셋
  const reset = useCallback(() => {
    setIsRunning(false);
    setTimerCount(effectiveInitialValue);
  }, [effectiveInitialValue]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isRunning || delay === null) return;

    const id = setInterval(() => {
      setTimerCount((prevCount) => {
        const nextCount = prevCount - 1;

        if (nextCount <= 0) {
          pause();
          // console.log('타이머가 완료됐습니다.');
          if (onCompleteRef.current) onCompleteRef.current();
          return 0;
        }

        return nextCount;
      });
    }, delay);

    return () => clearInterval(id);
  }, [isRunning, delay, pause]);

  return { timerCount, isRunning, start, pause, reset };
};

export default useTimer;
