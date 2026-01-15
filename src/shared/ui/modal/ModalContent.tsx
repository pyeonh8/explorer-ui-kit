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
  title,
}: ModalContentProps) => {
  if (!isOpen) return null;

  const baseStyle =
    'grid max-w-[450px] grid-rows-[1fr_auto] rounded-2xl bg-(--color-foreground) p-6';

  const finalClass = twMerge(baseStyle, className);

  return ReactDOM.createPortal(
    <div className="modal-overlay bg-opacity-50 fixed inset-0 z-9999 flex items-center justify-center bg-black/60">
      {/* 모달 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
        className="w-max"
      >
        <div className={finalClass}>
          {/* 모달 컨텐츠 */}
          <div className="text-center text-[18px]">
            {title && (
              <h2 id="modal-title" className="sr-only">
                {title}
              </h2>
            )}
            {children}
          </div>
          {/* 모달 버튼 */}
          <footer className="flex justify-center gap-3 pt-5!">
            {actionButton}

            {!hideCloseButton && (
              <ModalButton onClick={close}>닫기</ModalButton>
            )}
          </footer>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalContent;
