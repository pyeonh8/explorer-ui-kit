import { useEffect, useState } from 'react';
import useTimer from '@/shared/hooks/useTimer';
import formatTime from '@/shared/utils/formatTime';
import Modal from '@/shared/ui/modal/Modal';
import ModalButton from '@/shared/ui/modal/ModalButton';
import { ExpeditionInProgressProps } from '@/types/features.type';
import { TranslateItem } from '@/types/api.types';

import { FaRegStopCircle } from 'react-icons/fa';
import { FaRegCirclePlay } from 'react-icons/fa6';
import Image from 'next/image';

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

  const [rewardPool, setRewardPool] = useState<TranslateItem[]>([]);
  const [currentReward, setCurrentReward] = useState<TranslateItem | null>(
    null
  );

  const randomItem = () => {
    const randomNumber = Math.floor(Math.random() * rewardPool.length);
    return rewardPool[randomNumber];
  };

  console.log(currentReward);

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
          setCurrentReward(randomItem());
        }
      }
    },
  });

  useEffect(() => {
    if (isStarted) start();
  }, [isStarted, start]);

  useEffect(() => {
    setRewardPool(collectibleItems);
  }, [collectibleItems]);

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

      {currentReward && (
        <>
          <Image
            src={currentReward?.image_url}
            alt={currentReward?.name}
            width={80}
            height={80}
          />
          <div>{currentReward?.koName}</div>
        </>
      )}
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
        동물 친구들이 모험에서 돌아왔습니다!
      </Modal>
    </div>
  );
};

export default PomodoroTimer;
