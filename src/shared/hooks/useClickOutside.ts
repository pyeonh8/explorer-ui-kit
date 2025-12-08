import { useEffect } from 'react';

/**
 * 특정 요소의 바깥 영역을 사용자가 클릭하면 콜백을 실행하는 훅
 * @param ref - 감지할 요소에 연결된 React.useRef 객체
 * @param callback - 바깥 영역이 클릭되었을 때 실행할 함수, useCallback 사용을 권유
 */
const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      // 1. ref.current가 null이 아니고,
      // 2. 클릭된 지점(e.target)이 ref 요소 내부에 포함되어 있지 않다면
      if (ref.current && !ref.current.contains(e.target as Node)) callback();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
};

export default useClickOutside;
