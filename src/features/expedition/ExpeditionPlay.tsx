import { useEffect, useRef, useState } from 'react';
import { ExpeditionPlayProps, LogEntry } from '@/types/features.type';
import { RANDOM_LOGS } from '@/constants/randomLogs';
import IconButton from '@/shared/ui/IconButton';
import InfoBubble from '@/shared/ui/InfoBubble';
import PomodoroTimer from '../pomodoro/PomodoroTimer';
import { getRandomItem } from '@/shared/utils/random';
import formatDate from '@/shared/utils/formatDate';
import { LuCornerUpLeft } from 'react-icons/lu';
import Modal from '@/shared/ui/modal/Modal';
import ModalButton from '@/shared/ui/modal/ModalButton';
import { IoIosWarning } from 'react-icons/io';

// 탐험 진행 화면
const ExpeditionPlay = ({
  goalRounds,
  isAdventureStarted,
  onAdventureStart,
  collectibleItems,
  isTimerRunning,
  onTimerRunningChange,
  selectedCharacters: selectedAmiibo,
  isTimerFinished,
  setIsTimerFinished,
}: ExpeditionPlayProps) => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      type: 'system',
      text: '오늘의 모험을 시작해볼까요?',
      time: formatDate(),
      borderStyle: 'bottom',
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  const scrollRef = useRef<HTMLUListElement>(null);

  const handleRestAndExit = () => {
    onAdventureStart(false);
    onTimerRunningChange(false);
    setIsTimerFinished(false);
  };

  // 동물 친구들 로그
  useEffect(() => {
    if (isTimerRunning) {
      const updateLog = () => {
        const nextAmiibo = getRandomItem(selectedAmiibo || []);
        const nextMessage = getRandomItem(RANDOM_LOGS);

        setLogs((prevLogs) => [
          ...prevLogs,
          {
            type: 'animal',
            name: nextAmiibo,
            text: nextMessage,
            time: formatDate(),
          },
        ]);
      };

      const intervalId = setInterval(updateLog, 3500);
      return () => clearInterval(intervalId);
    }
  }, [isTimerRunning, selectedAmiibo]);

  // 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <>
      <PomodoroTimer
        goalRounds={goalRounds}
        isAdventureStarted={isAdventureStarted}
        onAdventureStart={onAdventureStart}
        collectibleItems={collectibleItems}
        onTimerRunningChange={onTimerRunningChange}
        isTimerFinished={isTimerFinished}
        setIsTimerFinished={setIsTimerFinished}
        setLogs={setLogs}
      />
      <div className="rounded-2xl bg-(--color-foreground)">
        <ul
          ref={scrollRef}
          className="custom-scroll h-[250px] max-h-[calc(100vh-720px)] min-h-[150px] overflow-hidden overflow-y-scroll px-3 py-3"
        >
          {logs.map((log, index) => (
            <li
              key={index}
              className={`border-dashed border-(--color-primary) px-2 text-[14px] leading-tight sm:text-[15px] ${log.type === 'system' ? 'py-3 text-center' : 'py-1'} ${log.borderStyle === 'top' && 'mt-2 border-t-2'} ${log.borderStyle === 'bottom' && 'mb-2 border-b-2'}`}
            >
              {log.type === 'animal' && (
                <p>
                  {log.time && (
                    <time className="font-bold">{`[${log.time}] `}</time>
                  )}
                  {log.name && <span className="font-bold">{log.name}</span>}
                  {log.text}
                </p>
              )}
              {log.type === 'system' && (
                <div className="flex flex-col">
                  <time className="text-[14px]">{log.time}</time>
                  <strong className="text-[20px]">{log.text}</strong>
                </div>
              )}
              {log.type === 'npc' && (
                <article>
                  <InfoBubble
                    npc={'resetti'}
                    imageSize={48}
                    className="bg-(--color-primary) px-4 py-2.5 font-bold after:border-r-(--color-primary) sm:px-4 sm:py-3"
                  >
                    {log.text}
                  </InfoBubble>
                </article>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 모험 준비하러 가기 버튼/모달 */}
      <div className="flex items-center justify-center pt-3">
        <IconButton
          onClick={() => {
            if (!isTimerFinished) {
              setModalOpen(true);
              return;
            }

            handleRestAndExit();
          }}
          className="min-h-[50px] font-bold"
        >
          <LuCornerUpLeft />
          모험 준비하러 가기
        </IconButton>

        <Modal
          isOpen={modalOpen}
          actionButton={
            <>
              <ModalButton
                onClick={() => {
                  setModalOpen(false);
                  handleRestAndExit();
                }}
              >
                모험 준비하기
              </ModalButton>
              <ModalButton
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                타이머 유지하기
              </ModalButton>
            </>
          }
          hideCloseButton
        >
          <div className="flex flex-col items-center gap-3">
            <IoIosWarning className="text-3xl text-orange-700" />
            <span>
              지금 모험 준비하러 돌아가면 <br />{' '}
              <strong>타이머가 리셋되고 보상을 받을 수 없어요!</strong>
            </span>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default ExpeditionPlay;
