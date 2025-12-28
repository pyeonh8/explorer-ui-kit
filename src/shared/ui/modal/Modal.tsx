import useModal from '../../hooks/useModal';
import ModalContent from './ModalContent';
import { ModalProps } from '@/types/common.types';
import Button from '../Button';
import { useEffect } from 'react';

const Modal = ({
  children,
  actionButton,
  openButton,
  hideCloseButton,
  isOpen: triggerOpen,
}: ModalProps) => {
  const { isOpen, modalRef, open, close } = useModal();

  useEffect(() => {
    if (triggerOpen) open?.();
  }, [triggerOpen, open]);

  const isControlledMode = triggerOpen !== undefined;

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
      >
        {children}
      </ModalContent>
    </>
  );
};

export default Modal;
