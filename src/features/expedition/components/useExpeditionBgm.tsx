import { useEffect } from 'react';
import useSound from '@/shared/hooks/useSound';
import { useExpeditionBgmProps } from '@/types/features.type';

const useExpeditionBgm = ({
  isBgmEnabled,
  isAdventureStarted,
  isTimerFinished,
}: useExpeditionBgmProps) => {
  // 대기 배경음
  const setupBgm = useSound({
    src: '/sounds/bgm-default.mp3',
    volume: 1,
    loop: true,
  });

  // 타이머 완료 배경음
  const TimerFinishBgm = useSound({
    src: '/sounds/bgm-timer-finish.mp3',
    volume: 1,
    loop: true,
  });

  useEffect(() => {
    if (!isBgmEnabled) {
      setupBgm.pause();
      TimerFinishBgm.pause();
      return;
    }

    if (!isAdventureStarted) {
      // 대기 브금
      TimerFinishBgm.stop();
      setupBgm.play();
    } else {
      // 모험 시작
      if (isTimerFinished) {
        // 타이머 완료
        setupBgm.stop();
        TimerFinishBgm.play();
      } else {
        setupBgm.stop();
        TimerFinishBgm.stop();
      }
    }

    return () => {
      setupBgm.pause();
      TimerFinishBgm.pause();
    };
  }, [
    setupBgm,
    TimerFinishBgm,
    isBgmEnabled,
    isAdventureStarted,
    isTimerFinished,
  ]);
};

export default useExpeditionBgm;
