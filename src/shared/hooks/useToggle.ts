'use client';

import { useCallback, useState } from 'react';

/**
 * boolean 상태를 관리하고 상태를 토클하는 훅
 * @param {boolean} initialValue - 초기 상태 값 (기본값: false)
 * @returns {{value: boolean, toggle: () => void}} - {현재 상태, 토글 함수}
 */
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  // 렌더링 시마다 함수 재생성 방지
  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  return { value, toggle };
};

export default useToggle;
