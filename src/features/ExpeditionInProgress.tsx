// import { ExpeditionInProgressProps } from '@/types/features.type';
// import useTimer from '@/shared/hooks/useTimer';
// import { useEffect } from 'react';
// import Modal from '@/shared/ui/modal/Modal';

// // 탐험 진행 화면
// const ExpeditionInProgress = ({
//   timerTime,
//   onStart,
//   isStarted,
// }: ExpeditionInProgressProps) => {
//   const handleTimerEnd = () => {
//     <Modal>테스트</Modal>;
//   };

//   const { timerCount, isRunning, start, pause, reset } = useTimer({
//     initialValue: Number(timerTime),
//     delay: 1000,
//     onComplete: handleTimerEnd,
//   });

//   useEffect(() => {
//     if (isStarted) start();
//   }, [isStarted, start]);

//   return (
//     <>
//       <div>탐험 진행 화면</div>
//       <div>
//         <div>카운터 시간 {timerCount}</div>
//         <p>상태: {isRunning ? '실행 중' : '정지됨'}</p>
//       </div>
//     </>
//   );
// };
// export default ExpeditionInProgress;
