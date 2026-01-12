import { useEffect, useState } from 'react';
import { PomodoroTimerProps } from '@/types/features.type';
import useTimer from '@/shared/hooks/useTimer';
import UseReward from './UseReward';
import formatTime from '@/shared/utils/formatTime';
import Modal from '@/shared/ui/modal/Modal';
import ModalButton from '@/shared/ui/modal/ModalButton';
import InfoBubble from '@/shared/ui/InfoBubble';
import { ItemGrid, RewardCard } from '@/shared/ui/ItemGrid';
import { FaRegStopCircle } from 'react-icons/fa';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { LuAlarmClockCheck } from 'react-icons/lu';

const POMODORO_TIMES = {
  WORK: 0.2 * 60,
  REST: 0.2 * 60,
};

const PomodoroTimer = ({
  timerTime: targetCycles = 1,
  isStarted,
  onStart,
  collectibleItems,
  onTimerRunningChange,
  isTimeOut,
  setIsTimeOut,
}: PomodoroTimerProps) => {
  const [mode, setMode] = useState<'WORK' | 'REST'>('WORK');
  const [currentCycles, setCurrentCycle] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  // 모험이 끝났을 때에 안내 변경!!!!!!!!!

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

  // isStarted true
  useEffect(() => {
    if (isStarted) start();
  }, [isStarted, start]);

  // isStarted false
  useEffect(() => {
    if (!isStarted) {
      reset();
      if (isStarted) setCurrentReward(null);
    }
  }, [isStarted, reset, setCurrentReward]);

  // 타이머 실행 유무
  useEffect(() => {
    onTimerRunningChange(isRunning);
  }, [onTimerRunningChange, isRunning]);

  // 타이머가 0일 때 true
  useEffect(() => {
    if (timerCount !== 0 && !isTimeOut) return;
    setIsTimeOut(true);
  }, [setIsTimeOut, timerCount, isTimeOut]);

  return (
    <article>
      {/* 안내 말풍선 */}
      <aside className="py-2">
        <InfoBubble className="text-center sm:py-3">
          <h2 className="mt-1 text-[22px] font-black sm:text-2xl">
            동물 친구들이{' '}
            {isRunning ? (
              <>
                <span className="text-(--color-accent)">
                  {mode === 'WORK' ? '탐험' : '휴식'}
                </span>{' '}
                중에요!
              </>
            ) : (
              '모험을 기다려요!'
            )}
          </h2>
          <p className="mt-1 text-[13px] sm:text-[14px]">
            총 {targetCycles}회 탐험 중{' '}
            <span className="text-(--color-accent)">
              {' '}
              {currentCycles}회 진행
            </span>
            하고 있습니다.
          </p>
        </InfoBubble>
      </aside>

      {/* 타이머 */}
      <section className="relative flex flex-col items-center pt-6 pb-3 sm:pt-8 sm:pb-4">
        <time
          className="relative z-10 text-6xl font-bold sm:text-7xl"
          dateTime={`PT${timerCount}S`}
        >
          {formatTime(timerCount)}
        </time>
        {/* <p>{isRunning ? '실행 중' : '정지됨'}</p> */}
        <div className="h-6 text-[20px] opacity-50 sm:text-2xl">
          {!isTimeOut && (
            <>
              {isRunning ? (
                <button onClick={pause} className="cursor-pointer">
                  {/* 멈춤 */}
                  <FaRegStopCircle />
                </button>
              ) : (
                <button onClick={start} className="cursor-pointer">
                  {/* 시작 */}
                  <FaRegCirclePlay />
                </button>
              )}
            </>
          )}
        </div>
        <LuAlarmClockCheck className="absolute top-[43%] left-1/2 -translate-1/2 text-7xl text-(--color-primary) opacity-40 sm:text-8xl" />
      </section>

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
    </article>
  );
};

export default PomodoroTimer;
