import useModal from '../../hooks/useModal';
import Button from '../Button';
import ModalContent from './ModalContent';
import { ModalProps } from '@/types/common.types';

const Modal = ({ children, actionButton }: ModalProps) => {
  const { isOpen, modalRef, open, close } = useModal();

  return (
    <>
      <Button onClick={open}>모달 열기</Button>

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
