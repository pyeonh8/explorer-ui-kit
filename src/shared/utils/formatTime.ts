/**
 * 초 단위를 MM:SS 형식의 문자열로 변환
 */
const formatTime = (time: number): string => {
  if (isNaN(time) || time < 0) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  // n초 => 0n초
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes} : ${formattedSeconds}`;
};

export default formatTime;
