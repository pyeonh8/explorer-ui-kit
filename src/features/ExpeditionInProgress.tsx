import { ExpeditionInProgressProps } from '@/types/features.type';
import PomodoroTimer from './pomodoro/PomodoroTimer';

// 탐험 진행 화면
const ExpeditionInProgress = ({
  timerTime,
  isStarted,
  onStart,
}: ExpeditionInProgressProps) => {
  return (
    <>
      <div>탐험 진행 화면</div>

      <PomodoroTimer
        timerTime={timerTime}
        isStarted={isStarted}
        onStart={onStart}
      />
      {/* 임시 */}
      <button onClick={() => onStart(false)}>탐험 준비하러 가기</button>
    </>
  );
};
export default ExpeditionInProgress;
