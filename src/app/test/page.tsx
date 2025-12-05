'use client';

import useToggle from '@/shared/hooks/useToggle';
import useCounter from '@/shared/hooks/useCounter';
import useTimer from '@/shared/hooks/useTimer';

const Test = () => {
  const { value, toggle } = useToggle();
  const { count, increment, decrement, reset } = useCounter({
    max: 10,
    min: 1,
  });

  const handleTimerEnd = () => {
    alert('시간이 끝났습니다.');
  };

  const {
    timerCount,
    isRunning,
    start,
    pause,
    reset: timerReset,
  } = useTimer({ initialValue: 11, onComplete: handleTimerEnd });

  return (
    <div>
      <h1>테스트 페이지</h1>
      <button onClick={toggle}>{value ? 'false' : 'true'}</button>
      <hr />
      <div>
        <button onClick={increment}>올라감</button>
        <button onClick={decrement}>내려감</button>
        <button onClick={reset}>리셋</button>
        {count}
      </div>
      <hr />
      <h2>카운터 {timerCount} 분</h2>
      <p>상태: {isRunning ? '실행 중' : '정지됨'}</p>
      <div className="flex gap-3">
        <button onClick={start}>시작</button>
        <button onClick={pause}>멈춤</button>
        <button onClick={timerReset}>리셋</button>
      </div>
    </div>
  );
};

export default Test;
