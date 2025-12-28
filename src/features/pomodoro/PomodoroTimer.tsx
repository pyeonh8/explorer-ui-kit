import { useEffect, useState } from 'react';
import useTimer from '@/shared/hooks/useTimer';
import formatTime from '@/shared/utils/formatTime';
import { FaRegStopCircle } from 'react-icons/fa';
import { FaRegCirclePlay } from 'react-icons/fa6';

const PomodoroTimer = ({
  targetCycles = 1,
  isStarted,
}: {
  targetCycles?: number;
  isStarted: boolean;
}) => {
  const POMODORO_TIMES = {
    WORK: 25 * 60,
    REST: 5 * 60,
  };

  const [mode, setMode] = useState<'WORK' | 'REST'>('WORK');
  const [currentCycles, setCurrentCycle] = useState(1);

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
          alert('목표가 끝났습니다.');
        }
      }
    },
  });

  useEffect(() => {
    if (isStarted) start();
  }, [isStarted, start]);

  return (
    <>
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
    </>
  );
};

export default PomodoroTimer;
