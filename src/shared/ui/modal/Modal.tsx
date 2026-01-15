import useModal from '../../hooks/useModal';
import ModalContent from './ModalContent';
import { ModalProps } from '@/types/common.types';
import Button from '../Button';
import { useEffect } from 'react';
/**
 * 모달
 */
const Modal = ({
  children,
  actionButton,
  openButton,
  hideCloseButton,
  isOpen: triggerOpen,
  className = '',
  title,
}: ModalProps) => {
  const { isOpen, modalRef, open, close } = useModal();
  const isControlledMode = triggerOpen !== undefined;

  useEffect(() => {
    if (!isControlledMode) return;

    if (triggerOpen) {
      open?.();
    } else {
      close?.();
    }
  }, [isControlledMode, triggerOpen, open, close]);

  return (
    <>
      {!isControlledMode &&
        (openButton ? (
          openButton(open!)
        ) : (
          <Button onClick={open}>모달 열기</Button>
        ))}

      <ModalContent
        isOpen={isOpen}
        modalRef={modalRef}
        close={close}
        actionButton={actionButton}
        hideCloseButton={hideCloseButton}
        className={className}
        title={title}
      >
        {children}
      </ModalContent>
    </>
  );
};

export default Modal;
