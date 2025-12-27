import AmiiboCardList from './amiibo/AmiiboCardList';

import Modal from '@/shared/ui/modal/Modal';

import IconButton from '@/shared/ui/IconButton';
import ModalButton from '@/shared/ui/modal/ModalButton';
import { PiTimerBold } from 'react-icons/pi';
import { ExpeditionSetupProps } from '@/types/features.type';

// 탐험 준비 화면
const ExpeditionSetup = ({
  initialAmiibo,
  selectedAmiibo,
  onSelect,
  timerTime,
  onStart,
}: ExpeditionSetupProps) => {
  const notChoice = selectedAmiibo.length === 0;

  return (
    <>
      <Modal
        openButton={(open) => (
          <IconButton onClick={open}>
            <PiTimerBold /> 모험 시작!
          </IconButton>
        )}
        actionButton={
          !notChoice && (
            <ModalButton onClick={() => onStart(true)}>타이머 시작</ModalButton>
          )
        }
      >
        {!notChoice
          ? `${timerTime}분 동안 모험이 시작됩니다!`
          : '최소 한 명의 캐릭터를 선택해주세요!'}
      </Modal>

      <AmiiboCardList
        initialAmiibo={initialAmiibo}
        selectedAmiibo={selectedAmiibo}
        onSelect={onSelect}
      />
    </>
  );
};

export default ExpeditionSetup;
