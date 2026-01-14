import { useEffect, useState } from 'react';
import { LogEntry, PomodoroTimerProps } from '@/types/features.type';
import useTimer from '@/shared/hooks/useTimer';
import UseReward from './UseReward';
import formatTime from '@/shared/utils/formatTime';
import Button from '@/shared/ui/Button';
import Modal from '@/shared/ui/modal/Modal';
import ModalButton from '@/shared/ui/modal/ModalButton';
import InfoBubble from '@/shared/ui/InfoBubble';
import formatDate from '@/shared/utils/formatDate';
import { ItemGrid, RewardCard } from '@/shared/ui/ItemGrid';
import { FaRegStopCircle } from 'react-icons/fa';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { LuAlarmClockCheck } from 'react-icons/lu';
import { FaGift } from 'react-icons/fa6';
import useSoundEffect from '@/shared/hooks/useSoundEffect';

const POMODORO_TIMES = {
  WORK: 0.2 * 60,
  REST: 0.1 * 60,
};

const PomodoroTimer = ({
  goalRounds = 1,
  isAdventureStarted,
  onAdventureStart,
  collectibleItems,
  onTimerRunningChange,
  isTimerFinished,
  setIsTimerFinished,
  setLogs,
}: PomodoroTimerProps) => {
  const [mode, setMode] = useState<'WORK' | 'REST'>('WORK');
  const [currentCycles, setCurrentCycle] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  // 랜덤 보상 훅
  const { currentReward, generateReward, setCurrentReward } =
    UseReward(collectibleItems);

  // 타이머 시작 효과음
  const { play: playWorkStartSfx } = useSoundEffect({
    src: '/sounds/sfx-timer-start.mp3',
  });

  // 타이머 휴식 효과음
  const { play: playRestStartSfx } = useSoundEffect({
    src: '/sounds/sfx-timer-break.mp3',
  });

  // 타이머 완료 효과음
  const { play: playAllDoneSfx } = useSoundEffect({
    src: '/sounds/sfx-timer-end.mp3',
  });

  // 타이머 훅
  const { timerCount, isRunning, start, pause, reset } = useTimer({
    initialValue: mode === 'WORK' ? POMODORO_TIMES.WORK : POMODORO_TIMES.REST,
    onComplete: () => {
      if (mode === 'WORK') {
        setMode('REST');
        playRestStartSfx();
      } else {
        if (currentCycles < goalRounds) {
          setCurrentCycle((prev) => prev + 1);
          setMode('WORK');
          playWorkStartSfx();
        } else {
          // 타이머 종료일 떄
          setTimeout(() => {
            playAllDoneSfx();

            // 타이머 끝남 true
            setIsTimerFinished(true);

            // 보상 모달 오픈
            setModalOpen(true);

            // 보상 아이템 랜덤 뽑기
            generateReward(3 * goalRounds);

            // 타이머 종료 안내 로그
            setLogs((prev) => [
              ...prev,
              {
                type: 'system',
                text: '모험이 완료됐습니다.',
                time: formatDate(),
                borderStyle: 'bottom',
              },
            ]);
          }, 0);
        }
      }
    },
  });

  const handleToggleTimer = () => {
    const msg: LogEntry[] = isRunning
      ? [
          {
            type: 'system',
            text: '모험을 중지합니다.',
            time: formatDate(),
            borderStyle: 'top',
          },
          {
            type: 'npc',
            name: 'resetti',
            text: '휴식은 모험 끝낸 뒤에 하라고 말 안 했드나!',
          },
        ]
      : [
          {
            type: 'system',
            text: '모험을 재시작합니다.',
            time: formatDate(),
            borderStyle: 'bottom',
          },
        ];
    if (isRunning) {
      pause();
    } else {
      start();
    }
    setLogs((prev) => [...prev, ...msg]);
  };

  // 타이머 모드가 바뀌면 리셋 후 재시작
  useEffect(() => {
    if (isAdventureStarted && !isTimerFinished) {
      reset();
      start();
    }
  }, [mode, currentCycles, isAdventureStarted, isTimerFinished, reset, start]);

  // 타이머 실행 유무
  useEffect(() => {
    onTimerRunningChange(isRunning);
  }, [onTimerRunningChange, isRunning]);

  // isStarted true
  useEffect(() => {
    if (isAdventureStarted) {
      playWorkStartSfx();
      start();
    }
  }, [isAdventureStarted, start, playWorkStartSfx]);

  // isStarted false
  useEffect(() => {
    if (!isAdventureStarted) {
      reset();
      if (isAdventureStarted) setCurrentReward(null);
    }
  }, [isAdventureStarted, reset, setCurrentReward]);

  return (
    <article>
      {/* 안내 말풍선 */}
      <aside className="py-2">
        <InfoBubble className="text-center sm:py-3">
          {!isTimerFinished ? (
            <>
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
                총 {goalRounds}회 탐험 중{' '}
                <span className="text-(--color-accent)">
                  {' '}
                  {currentCycles}회 진행
                </span>
                하고 있습니다.
              </p>
            </>
          ) : (
            <>
              <h2 className="mt-1 text-[22px] font-black sm:text-2xl">
                다음 모험에서 다시 만나요!
              </h2>
              <p className="mt-1 text-[13px] sm:text-[14px]">
                총{' '}
                <span className="text-(--color-accent)">{goalRounds}회 </span>{' '}
                모험이 완료했습니다.
              </p>
            </>
          )}
        </InfoBubble>
      </aside>

      {/* 타이머 */}
      <section
        className={`relative flex flex-col items-center pb-2 sm:pb-3 ${isTimerFinished ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-6'}`}
      >
        <time
          className="relative z-10 text-6xl font-bold sm:text-7xl"
          dateTime={`PT${timerCount}S`}
        >
          {formatTime(timerCount)}
        </time>
        {!isTimerFinished && (
          <div className="h-6 text-[20px] opacity-50 sm:text-2xl">
            <Button variant="plain" onClick={handleToggleTimer}>
              {isRunning ? <FaRegStopCircle /> : <FaRegCirclePlay />}
            </Button>
          </div>
        )}
        <LuAlarmClockCheck className="absolute top-[43%] left-1/2 -translate-1/2 text-7xl text-(--color-primary) opacity-40 sm:text-8xl" />
      </section>

      {/* 보상 */}
      <section className="pb-4 text-center">
        <div className="mb-2.5 flex items-center justify-center gap-2 text-[14px] sm:text-[16px]">
          <FaGift />
          {!isTimerFinished ? (
            <h3 className="translate-y-px">
              모험이 끝나면{' '}
              <span className="text-(--color-accent)">
                {' '}
                {3 * goalRounds}개의 선물
              </span>
              이 기다리고 있어요!
            </h3>
          ) : (
            <h3 className="translate-y-px">
              동물 친구들이 모험에서 선물을 가져왔어요!
            </h3>
          )}
        </div>
        <ItemGrid
          className={`mx-auto w-fit h-[${60 * 3}px] ${
            goalRounds === 1
              ? 'grid-cols-3'
              : goalRounds === 3
                ? 'grid-cols-5'
                : 'grid-cols-6'
          }`}
        >
          {isTimerFinished && (
            <>
              {currentReward?.map((item, index) => (
                <RewardCard
                  key={`${item.internalId}-${index} ${item.name}`}
                  item={item}
                  imageSize={40}
                />
              ))}
            </>
          )}
        </ItemGrid>
      </section>

      {/* 보상 안내 모달 */}
      <Modal
        isOpen={modalOpen}
        actionButton={
          <ModalButton
            onClick={() => {
              setModalOpen(false);
              onAdventureStart(false);
              if (isAdventureStarted) setCurrentReward(null);
            }}
          >
            준비하러 돌아가기
          </ModalButton>
        }
      >
        <div>
          <div className="flex flex-col items-center gap-3 pb-4">
            <FaGift className="text-3xl text-(--color-accent)" />
            <h2>동물 친구들이 모험에서 선물을 가져왔어요!</h2>
          </div>
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
