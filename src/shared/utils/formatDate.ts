/** Date 객체를 '오전/오후 00:00' 형식의 문자열로 변환 */
const formatDate = (date: Date = new Date()) => {
  return date.toLocaleTimeString('ko-KR', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default formatDate;
