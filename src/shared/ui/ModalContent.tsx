'use client';

import ReactDOM from 'react-dom';
import { ModalContentProps } from '@/types/common.types';
import ModalButton from './ModalButton';

const ModalContent = ({
  isOpen,
  modalRef,
  close,
  children,
}: ModalContentProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay bg-opacity-50 fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div ref={modalRef} className="w-max">
        <div className="grid min-h-[500px] min-w-[600px] grid-rows-[1fr_auto] rounded-2xl bg-[var(--color-foreground)] p-[16px]">
          <div className="text-center text-[20px] font-bold">{children}</div>
          <div className="flex justify-center gap-3">
            <ModalButton>완료</ModalButton>
            <ModalButton onClick={close}>닫기</ModalButton>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalContent;
