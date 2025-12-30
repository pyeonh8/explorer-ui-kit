import { useEffect, useState } from 'react';
import Image from 'next/image';
import useTimer from '@/shared/hooks/useTimer';
import formatTime from '@/shared/utils/formatTime';
import Modal from '@/shared/ui/modal/Modal';
import ModalButton from '@/shared/ui/modal/ModalButton';
import { ExpeditionInProgressProps } from '@/types/features.type';

import { FaRegStopCircle } from 'react-icons/fa';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { Creature } from 'animal-crossing/lib/types/Creature';
import saveStorageId from '@/shared/utils/saveStorageId';

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
  const [currentReward, setCurrentReward] = useState<
    (Creature & { isNew?: boolean })[] | null
  >(null);

  // 아이템 랜덤 뽑기
  const getRandomItems = (count: number = 1) => {
    const rewards = [];

    const selectedIndices = new Set<number>();

    // 원하는 count 만큼 채워질 때까지 뽑음
    while (selectedIndices.size < count) {
      const randomNumber = Math.floor(Math.random() * collectibleItems.length);

      // 중복 제거
      if (!selectedIndices.has(randomNumber)) {
        selectedIndices.add(randomNumber);
        rewards.push(collectibleItems[randomNumber]);
      }
    }

    return rewards;
  };

  // 타이머 끝난 뒤 보상 함수
  const handleTimerComplete = () => {
    const items = getRandomItems(3 * targetCycles);

    const previousIds = saveStorageId('my-treasure-box', items);

    // 새로운 보상 표시
    const processedRewards = items.map((item) => ({
      ...item,
      isNew: !previousIds.includes(item.name),
    }));

    setCurrentReward(processedRewards);
    console.log(currentReward);
  };

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
          handleTimerComplete();
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
          <ul className="grid grid-cols-3 gap-4">
            {currentReward?.map((item, index) => {
              return (
                <li
                  key={`${item.internalId}-${index} ${item.name}`}
                  className="relative flex flex-col rounded-2xl bg-[#fff2bd] px-2 py-1"
                >
                  {item?.isNew ? (
                    <span className="absolute -top-1 -left-1 -rotate-20 rounded-[8px] bg-[var(--color-primary)] px-2 py-1 text-[12px] leading-[13px] font-bold">
                      New
                    </span>
                  ) : (
                    ''
                  )}
                  <Image
                    src={item?.iconImage}
                    alt={item?.name}
                    width={60}
                    height={60}
                    priority
                    className="m-auto"
                  />
                  <span className="text-sm">{item?.translations.kRko}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default PomodoroTimer;
