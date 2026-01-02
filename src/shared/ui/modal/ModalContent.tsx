'use client';

import ReactDOM from 'react-dom';
import { ModalContentProps } from '@/types/common.types';
import ModalButton from './ModalButton';
import { twMerge } from 'tailwind-merge';

const ModalContent = ({
  isOpen,
  modalRef,
  close,
  children,
  actionButton,
  hideCloseButton = false,
  className = '',
}: ModalContentProps) => {
  if (!isOpen) return null;

  const baseStyle =
    'grid max-w-[450px] grid-rows-[1fr_auto] rounded-2xl bg-[var(--color-foreground)] p-6';

  const finalClass = twMerge(baseStyle, className);

  return ReactDOM.createPortal(
    <div className="modal-overlay bg-opacity-50 fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      {/* 모달 */}
      <div ref={modalRef} className="w-max">
        <div className={finalClass}>
          {/* 모달 컨텐츠 */}
          <div className="text-center text-[20px]">{children}</div>
          {/* 모달 버튼 */}
          <div className="flex justify-center gap-3 !pt-5">
            {actionButton}

            {!hideCloseButton && (
              <ModalButton onClick={close}>닫기</ModalButton>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalContent;
