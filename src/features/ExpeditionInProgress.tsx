import { useEffect, useRef, useState } from 'react';
import { ExpeditionInProgressProps } from '@/types/features.type';
import PomodoroTimer from './pomodoro/PomodoroTimer';
// import Button from '@/shared/ui/Button';
import { RANDOM_LOGS } from '@/constants/RANDOM_LOGS';

type LogEntry = {
  type: 'system' | 'animal';
  name?: string;
  text: string;
};

const getRandomItem = <T,>(items: T[]): T => {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};

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
    },
  ]);

  const scrollRef = useRef<HTMLUListElement>(null);

  // 컴포넌트가 처음 로드될 때 '휴식 중'이 찍히는 걸 막기 위한 장치
  const isMounting = useRef(true);
  // 타이머가 처음 실행 될 때 '다시 모험'이 찍히는 걸 막기 위한 장치
  const isInitialStart = useRef(true);

  // 타이머 시작/멈춤 버튼 로그
  useEffect(() => {
    // 1. 모험 시작 전 기록X
    if (!isStarted) return;

    // 2. 컴포넌트 마운트 시점 출력 무시
    if (isMounting.current) {
      isMounting.current = false;
      return;
    }

    // 3. 타이머가 true가 되었을 때, '맨 처음 시작'인지 '일시정지 후 재시작'인지 판별
    if (isTimerRunning && isInitialStart.current) {
      isInitialStart.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      const msg = isTimerRunning ? '다시 모험을 시작합니다.' : '휴식 중...';
      setLogs((prevLogs) => [...prevLogs, { type: 'system', text: msg }]);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [isTimerRunning, isStarted]);

  // 동물 친구들 로그
  useEffect(() => {
    if (isTimerRunning) {
      const updateLog = () => {
        const nextAmiibo = getRandomItem(selectedAmiibo || []);
        const nextMessage = getRandomItem(RANDOM_LOGS);

        setLogs((prevLogs) => [
          ...prevLogs,
          { type: 'animal', name: nextAmiibo, text: nextMessage },
        ]);
      };

      const intervalId = setInterval(updateLog, 5000);
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
      />
      {/* 임시... 타이머 진행 중일 때 안내모달 넣기 */}
      {/* <Button onClick={() => onStart(false)}>탐험 준비하러 가기</Button> */}
      <div className="rounded-2xl bg-amber-100 pr-1 pl-4">
        <ul
          ref={scrollRef}
          className="custom-scroll max-h-[calc(100vh-850px)] min-h-[250px] overflow-hidden overflow-y-scroll py-3"
        >
          {logs.map((log, index) => (
            <li key={index}>
              {log.name && <span className="font-bold">{log.name}</span>}
              {log.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default ExpeditionInProgress;
