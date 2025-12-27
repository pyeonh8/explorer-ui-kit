import useModal from '../../hooks/useModal';
import ModalContent from './ModalContent';
import { ModalProps } from '@/types/common.types';

const Modal = ({ children, actionButton, trigger }: ModalProps) => {
  const { isOpen, modalRef, open, close } = useModal();

  return (
    <>
      {trigger && trigger(open!)}

      <ModalContent
        isOpen={isOpen}
        modalRef={modalRef}
        close={close}
        actionButton={actionButton}
      >
        {children}
      </ModalContent>
    </>
  );
};

export default Modal;
