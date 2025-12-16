'use client';

import useToggle from '@/shared/hooks/useToggle';
import useCounter from '@/shared/hooks/useCounter';
import useTimer from '@/shared/hooks/useTimer';
import useSound from '@/shared/hooks/useSound';
import Button from '@/shared/ui/Button';
import IconButton from '@/shared/ui/IconButton';
import { FaLeaf } from 'react-icons/fa';
import ToggleButton from '@/shared/ui/ToggleButton';
import Modal from '@/shared/ui/Modal';
import AmiiboList from '@/features/AmiibloList';

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

  const {
    isPlaying,
    play: soundPlay,
    pause: soundPause,
    toggle: soundToggle,
    formattedCurrentTime,
    formattedDuration,
  } = useSound({ src: '/sounds/배경음.mp3' });

  return (
    <div>
      <h1>테스트 페이지</h1>
      <hr />
      <Modal></Modal>
      <hr />
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
      <hr />
      <div className="flex gap-3">
        {isPlaying ? 'true' : 'false'}
        <button onClick={soundPlay}>노래시작</button>
        <button onClick={soundPause}>노래멈춤</button>
        <button onClick={soundToggle}>노래토글</button>
        <div>{formattedCurrentTime}</div>
        <div>{formattedDuration}</div>
      </div>
      <hr />
      <div className="flex gap-1 p-2">
        <Button
          onClick={() => {
            alert('테스트');
          }}
        >
          테스트
        </Button>
        <IconButton>
          <FaLeaf className="h-[25px] w-[25px]" />
        </IconButton>
        <ToggleButton onContent="ON" offContent="OFF">
          <FaLeaf className="h-[25px] w-[25px]" />
        </ToggleButton>
      </div>

      <AmiiboList />
    </div>
  );
};

export default Test;
