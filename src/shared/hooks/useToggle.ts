'use client';

import { useCallback, useState } from 'react';

/**
 * boolean 상태를 관리하고 상태를 토클하는 훅
 * @param {boolean} [options.initialValue=false] 초기 상태 값.
 * @return {boolean} return.value - 현재 토글 값
 * @return {function} return.toggle - 토글 값 변경
 */
const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  // 렌더링 시마다 함수 재생성 방지
  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  return { value, toggle };
};

export default useToggle;
