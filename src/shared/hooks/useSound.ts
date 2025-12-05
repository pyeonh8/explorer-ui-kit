import { useCallback, useEffect, useRef, useState } from 'react';

interface UseSoundOptions {
  src?: string;
  volume?: number;
  loop?: boolean;
}

interface UseSound {
  isPlaying: boolean;
  duration: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

/**
 *사운드 관리하고 제어하는 훅
 * @param {string} [options.src] - 사운드 src
 * @param {number} [options.volume] - 사운드 볼륨
 * @param {boolean} [options.loop] - 사운드 반복유무
 * @return {boolean} return.isPlaying -
 * @return {function} return.play -
 * @return {function} return.pause -
 * @return {function} return.toggle -
 */
const useSound = (options: UseSoundOptions = {}): UseSound => {
  const { src, volume = 0.5, loop = false } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  // 재생
  const play = useCallback(() => setIsPlaying(true), []);

  // 정지
  const pause = useCallback(() => setIsPlaying(false), []);

  // 토글
  const toggle = useCallback(() => setIsPlaying((prev) => !prev), []);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio 객체 초기화
  useEffect(() => {
    if (!src) return console.error('src가 존재하지 않습니다.');

    audioRef.current = new Audio(src);
    const audio = audioRef.current;

    // 사운드 종료 시 isPlaying = false 처리
    const handleEnd = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnd);

    // 노래 길이 확인
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnd);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current = null;
      console.log('클린업');
    };
  }, [src]);

  // 볼륨 및 루프 동기화
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = volume;
      audio.loop = loop;
    }
  }, [volume, loop]);

  // 재생/정지 동기화
  useEffect(() => {
    const audio = audioRef.current;

    // 재생/정지 동기화
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((e) => console.error('play failed', e));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return { isPlaying, duration, play, pause, toggle };
};

// const formatTime = () => {};

export default useSound;
