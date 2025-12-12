import useModal from '../hooks/useModal';
import Button from './Button';
import ModalContent from './ModalContent';

const Modal = ({}) => {
  const { isOpen, modalRef, open, close } = useModal();

  return (
    <>
      <Button onClick={open}>모달 열기</Button>

      <ModalContent isOpen={isOpen} modalRef={modalRef} close={close}>
        모달
      </ModalContent>
    </>
  );
};

export default Modal;
