import { ExpeditionInProgressProps } from '@/types/features.type';
import useTimer from '@/shared/hooks/useTimer';
import { useEffect, useState } from 'react';
import Modal from '@/shared/ui/modal/Modal';
import ModalButton from '@/shared/ui/modal/ModalButton';

// 탐험 진행 화면
const ExpeditionInProgress = ({
  timerTime,
  onStart,
  isStarted,
}: ExpeditionInProgressProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleTimerEnd = () => {
    setModalOpen(true);
  };

  const { timerCount, isRunning, start, pause } = useTimer({
    initialValue: Number(timerTime),
    delay: 1000,
    onComplete: handleTimerEnd,
  });

  useEffect(() => {
    if (isStarted) start();
  }, [isStarted, start]);

  return (
    <>
      {/* 아... 모달 ... 외부 클릭 되는 거 막아야함... */}
      <Modal
        isOpen={modalOpen}
        hideCloseButton={true}
        actionButton={
          <ModalButton
            onClick={() => {
              setModalOpen(false);
              onStart(false);
            }}
          >
            되돌아가기
          </ModalButton>
        }
      >
        모험이 끝났습니다.
      </Modal>
      <div>탐험 진행 화면</div>
      <div>
        <div>카운터 시간 {timerCount}</div>
        <p>상태: {isRunning ? '실행 중' : '정지됨'}</p>
        <button onClick={pause}>중지</button>
      </div>

      {/* 임시 */}
      <button onClick={() => onStart(false)}>탐험 준비하러 가기</button>
    </>
  );
};
export default ExpeditionInProgress;
