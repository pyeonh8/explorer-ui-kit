import { useEffect, useRef, useState } from 'react';
import { ExpeditionInProgressProps, LogEntry } from '@/types/features.type';
import { RANDOM_LOGS } from '@/constants/RANDOM_LOGS';
import Button from '@/shared/ui/Button';
import InfoBubble from '@/shared/ui/InfoBubble';
import PomodoroTimer from './pomodoro/PomodoroTimer';
import { getRandomItem } from '@/shared/utils/random';
import formatDate from '@/shared/utils/formatDate';

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
      time: formatDate(),
      borderStyle: 'bottom',
    },
  ]);

  // 남은 시간이 0일 때 true
  const [isTimeOut, setIsTimeOut] = useState(false);

  const scrollRef = useRef<HTMLUListElement>(null);

  // 타이머 완료 로그
  useEffect(() => {
    if (isTimeOut) {
      const timeoutId = setTimeout(() => {
        const timeOutMsg: LogEntry = {
          type: 'system',
          text: '모험이 완료됐습니다.',
          time: formatDate(),
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
            time: formatDate(),
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
        setLogs={setLogs}
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
