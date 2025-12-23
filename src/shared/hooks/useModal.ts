import { useCallback, useRef, useState } from 'react';
import useClickOutside from './useClickOutside';
import { UseModalProps } from '@/types/hooks.types';

/**
 * 모달 제어하는 훅
 *
 * @return isOpen - 현재 모달의 열림/닫힘 상태
 * @return modalRef - 모달 DOM 요소에 연결할 Ref 객체
 * @return open - 모달의 열림
 * @return close - 모달의 닫힘
 */
const useModal = (): UseModalProps => {
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside({ ref: modalRef, callback: close });

  return { isOpen, modalRef, open, close };
};

export default useModal;
