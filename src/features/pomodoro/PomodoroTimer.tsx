import { useEffect, useState } from 'react';
import { ExpeditionInProgressProps } from '@/types/features.type';
import useTimer from '@/shared/hooks/useTimer';
import UseReward from './UseReward';
import formatTime from '@/shared/utils/formatTime';
import Modal from '@/shared/ui/modal/Modal';
import ModalButton from '@/shared/ui/modal/ModalButton';
import { ItemGrid, RewardCard } from '@/shared/ui/ItemGrid';
import { FaRegStopCircle } from 'react-icons/fa';
import { FaRegCirclePlay } from 'react-icons/fa6';

const PomodoroTimer = ({
  timerTime: targetCycles = 1,
  isStarted,
  onStart,
  collectibleItems,
}: ExpeditionInProgressProps) => {
  const POMODORO_TIMES = {
    WORK: 0.01 * 60,
    REST: 0.01 * 60,
  };
  const [mode, setMode] = useState<'WORK' | 'REST'>('WORK');
  const [currentCycles, setCurrentCycle] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  // 랜덤 보상 훅
  const { currentReward, generateReward, setCurrentReward } =
    UseReward(collectibleItems);

  // 타이머 훅
  const { timerCount, isRunning, start, pause, reset } = useTimer({
    initialValue: mode === 'WORK' ? POMODORO_TIMES.WORK : POMODORO_TIMES.REST,
    onComplete: () => {
      if (mode === 'WORK') {
        setMode('REST');
        reset();
        start();
      } else {
        if (currentCycles < targetCycles) {
          setCurrentCycle((prev) => prev + 1);
          setMode('WORK');
          reset();
          start();
        } else {
          // 타이머 종료
          setModalOpen(true);
          generateReward(3 * targetCycles);
        }
      }
    },
  });

  useEffect(() => {
    if (isStarted) start();
  }, [isStarted, start]);

  return (
    <div>
      <div>
        총 {targetCycles} 회 탐험 중 {currentCycles} 반복 중 입니다.
      </div>
      <div>
        {mode === 'WORK' ? '탐험 시간' : '휴식 시간'} : {formatTime(timerCount)}
      </div>
      <div>{isRunning ? '실행 중' : '정지됨'}</div>
      <button onClick={start}>
        <FaRegCirclePlay />
      </button>
      <button onClick={pause}>
        <FaRegStopCircle />
      </button>

      {/* 모달 */}
      <Modal
        isOpen={modalOpen}
        actionButton={
          <ModalButton
            onClick={() => {
              setModalOpen(false);
              onStart(false);
              if (isStarted) setCurrentReward(null);
            }}
          >
            되돌아가기
          </ModalButton>
        }
      >
        <div>
          <p> 동물 친구들이 모험에서 돌아왔습니다!</p>
          <ItemGrid>
            {currentReward?.map((item, index) => (
              <RewardCard
                key={`${item.internalId}-${index} ${item.name}`}
                item={item}
              />
            ))}
          </ItemGrid>
        </div>
      </Modal>
    </div>
  );
};

export default PomodoroTimer;
