import { ExpeditionInProgressProps } from '@/types/features.type';
import PomodoroTimer from './pomodoro/PomodoroTimer';
import Button from '@/shared/ui/Button';

// 탐험 진행 화면
const ExpeditionInProgress = ({
  timerTime,
  isStarted,
  onStart,
  collectibleItems,
}: ExpeditionInProgressProps) => {
  return (
    <>
      <div>탐험 진행 화면</div>

      <PomodoroTimer
        timerTime={timerTime}
        isStarted={isStarted}
        onStart={onStart}
        collectibleItems={collectibleItems}
      />
      {/* 임시... 타이머 진행 중일 때 안내모달 넣기 */}
      <Button onClick={() => onStart(false)}>탐험 준비하러 가기</Button>
    </>
  );
};
export default ExpeditionInProgress;
