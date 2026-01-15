import { useCallback, useEffect, useRef, useState } from 'react';
import { UseSoundProps } from '@/types/hooks.types';
import formatTime from '../utils/formatTime';

/**
 * 사운드 관리하고 제어하는 훅
 *
 * @param options.src - 사운드 src
 * @param options.volume - 사운드 볼륨
 * @param options.loop - 사운드 반복유무
 *
 * @return isPlaying - 사운드 플레이 유무
 * @return play - 사운드 시작
 * @return pause - 사운드 일시중지
 * @return toggle - 사운드 토글 (시작/일시중지)
 * @return stop - 사운드 중지 (0초로 돌아감)
 * @return formattedCurrentTime - 현재 사운드 위치
 * @return formattedDuration - 사운드 총 길이
 */
const useSound = (options: UseSoundProps = {}) => {
  const { src, volume = 0.5, loop = false } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 재생
  const play = useCallback(() => setIsPlaying(true), []);

  // 일시정지
  const pause = useCallback(() => setIsPlaying(false), []);

  // 토글
  const toggle = useCallback(() => setIsPlaying((prev) => !prev), []);

  // 정지
  const stop = useCallback(() => {
    setIsPlaying(false);
    if (audioRef.current) audioRef.current.currentTime = 0;
  }, []);

  // Audio 객체 초기화
  useEffect(() => {
    if (!src) return console.error('src가 존재하지 않습니다.');

    audioRef.current = new Audio(src);
    const audio = audioRef.current;

    // 사운드 종료 시 isPlaying = false 처리
    const handleEnd = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnd);

    // 노래 총 길이 확인
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    // 노래 현재 위치 확인
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnd);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current = null;
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

  const formattedCurrentTime = formatTime(currentTime);
  const formattedDuration = formatTime(duration);

  return {
    isPlaying,
    play,
    pause,
    toggle,
    stop,
    formattedCurrentTime,
    formattedDuration,
  };
};

export default useSound;
