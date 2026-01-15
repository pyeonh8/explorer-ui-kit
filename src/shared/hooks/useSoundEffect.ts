import { useCallback, useRef } from 'react';
import { UseSoundProps } from '@/types/hooks.types';

/**
 * 효과음을 관리하고 제어하는 훅
 *
 * @param options.src - 사운드 src
 * @param options.volume - 사운드 볼륨
 *
 * @return play -  사운드 시작
 */
const useSoundEffect = (options: UseSoundProps = {}) => {
  const { src, volume = 0.5 } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!src) return;

    // 객체 없으면 생성
    if (!audioRef.current) audioRef.current = new Audio(src);

    const audio = audioRef.current;

    audio.volume = volume;

    // 중첩 재생을 위해 재생 초기화
    if (!audio.paused) audio.currentTime = 0;

    audio.play().catch((err) => {
      console.error('효과음 재생 실패', err);
    });
  }, [src, volume]);

  return { play };
};

export default useSoundEffect;
