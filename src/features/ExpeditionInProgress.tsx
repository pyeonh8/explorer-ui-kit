import { useEffect, useRef, useState } from 'react';
import { ExpeditionInProgressProps } from '@/types/features.type';
import PomodoroTimer from './pomodoro/PomodoroTimer';
import Button from '@/shared/ui/Button';
import { RANDOM_LOGS } from '@/constants/RANDOM_LOGS';
import InfoBubble from '@/shared/ui/InfoBubble';

type LogEntry = {
  type?: 'system' | 'animal' | 'npc';
  name?: string;
  text: string;
  time?: string;
  borderStyle?: 'top' | 'bottom';
};

const getRandomItem = <T,>(items: T[]): T => {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};

const timeString = (now: Date) =>
  now.toLocaleTimeString('ko-KR', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
  });

// 탐험 진행 화면
const ExpeditionInProgress = ({
  timerTime,
  isStarted,
  onStart,
  collectibleItems,
  isTimerRunning,
  onTimerRunningChange,
  selectedAmiibo,
}: ExpeditionInProgressProps) => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      type: 'system',
      text: '오늘의 모험을 시작해볼까요?',
      time: timeString(new Date()),
      borderStyle: 'bottom',
    },
  ]);

  // 남은 시간이 0일 때 true
  const [isTimeOut, setIsTimeOut] = useState(false);

  const scrollRef = useRef<HTMLUListElement>(null);

  // 컴포넌트가 처음 로드될 때 '휴식 중'이 찍히는 걸 막기 위해 값을 메모리에 저장
  const isMounting = useRef(true);
  // 타이머가 처음 실행 될 때 '다시 모험'이 찍히는 걸 막기 위해 값을 메모리에 저장
  const isInitialStart = useRef(true);

  // 타이머 시작/멈춤 로그
  useEffect(() => {
    // 1. 모험 시작 전 기록X 또는 타이머 0일 때
    if (!isStarted || isTimeOut) {
      isMounting.current = true;
      isInitialStart.current = true;
      return;
    }

    // 2. 컴포넌트 마운트 시점 출력 무시
    if (isMounting.current) {
      isMounting.current = false;
      return;
    }

    // 3. 타이머가 재생 되었을 때, '맨 처음 시작'인지 '일시정지 후 재시작'인지 판별
    if (isTimerRunning && isInitialStart.current) {
      isInitialStart.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      const msg: LogEntry[] = isTimerRunning
        ? [
            {
              type: 'system',
              text: '모험을 재시작합니다.',
              time: timeString(new Date()),
              borderStyle: 'bottom',
            },
          ]
        : [
            {
              type: 'system',
              text: '모험을 중지합니다.',
              time: timeString(new Date()),
              borderStyle: 'top',
            },
            {
              type: 'npc',
              name: 'resetti',
              text: '휴식은 모험 끝낸 뒤에 하라고 말 안 했드나!',
            },
          ];
      setLogs((prevLogs) => [...prevLogs, ...msg]);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [isTimerRunning, isStarted, isTimeOut]);

  // 타이머 완료 로그
  useEffect(() => {
    if (isTimeOut) {
      const timeoutId = setTimeout(() => {
        const timeOutMsg: LogEntry = {
          type: 'system',
          text: '모험이 완료됐습니다.',
          time: timeString(new Date()),
          borderStyle: 'bottom',
        };
        setLogs((prevLogs) => [...prevLogs, timeOutMsg]);
        return () => clearTimeout(timeoutId);
      }, 0);
    }
  }, [isTimeOut]);

  // 동물 친구들 로그
  useEffect(() => {
    if (isTimerRunning) {
      const updateLog = () => {
        const nextAmiibo = getRandomItem(selectedAmiibo || []);
        const nextMessage = getRandomItem(RANDOM_LOGS);

        setLogs((prevLogs) => [
          ...prevLogs,
          {
            type: 'animal',
            name: nextAmiibo,
            text: nextMessage,
            time: timeString(new Date()),
          },
        ]);
      };

      const intervalId = setInterval(updateLog, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isTimerRunning, selectedAmiibo]);

  // 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <>
      <PomodoroTimer
        timerTime={timerTime}
        isStarted={isStarted}
        onStart={onStart}
        collectibleItems={collectibleItems}
        onTimerRunningChange={onTimerRunningChange}
        isTimeOut={isTimeOut}
        setIsTimeOut={setIsTimeOut}
      />
      {/* 임시... 타이머 진행 중일 때 안내모달 넣기 */}
      <div className="rounded-2xl bg-(--color-foreground)">
        <ul
          ref={scrollRef}
          className="custom-scroll max-h-[calc(100vh-850px)] min-h-[250px] overflow-hidden overflow-y-scroll px-3 py-3"
        >
          {logs.map((log, index) => (
            <li
              key={index}
              className={`border-dashed border-(--color-primary) px-2 text-[14px] leading-tight sm:text-[15px] ${log.type === 'system' ? 'py-3 text-center' : 'py-1'} ${log.borderStyle === 'top' && 'mt-2 border-t-2'} ${log.borderStyle === 'bottom' && 'mb-2 border-b-2'}`}
            >
              {log.type === 'animal' && (
                <p>
                  {log.time && (
                    <time className="font-bold">{`[${log.time}] `}</time>
                  )}
                  {log.name && <span className="font-bold">{log.name}</span>}
                  {log.text}
                </p>
              )}
              {log.type === 'system' && (
                <div className="flex flex-col">
                  <time className="text-[14px]">{log.time}</time>
                  <strong className="text-[20px]">{log.text}</strong>
                </div>
              )}
              {log.type === 'npc' && (
                <article>
                  <InfoBubble
                    npc={'resetti'}
                    imageSize={48}
                    className="bg-(--color-primary) px-4 py-2.5 font-bold after:border-r-(--color-primary) sm:px-4 sm:py-3"
                  >
                    {log.text}
                  </InfoBubble>
                </article>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Button
        onClick={() => {
          onStart(false);
          onTimerRunningChange(false);
          setIsTimeOut(false);
        }}
      >
        탐험 준비하러 가기
      </Button>
    </>
  );
};
export default ExpeditionInProgress;
