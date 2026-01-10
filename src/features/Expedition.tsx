'use client';

import { useCallback, useState } from 'react';
import { creatures } from 'animal-crossing';
import { TranslatedAmiibo, TranslateVillager } from '@/types/api.types';
import CharacterPanel from './characterPanel/CharacterPanel';
import ExpeditionHeader from './ExpeditionHeader';
import ExpeditionSetup from '@/features/ExpeditionSetup';
import ExpeditionInProgress from './ExpeditionInProgress';
import IconButton from '@/shared/ui/IconButton';
import Modal from '@/shared/ui/modal/Modal';
import ModalButton from '@/shared/ui/modal/ModalButton';
import CollectionsModal from './CollectionsModal';
import { TbMusic } from 'react-icons/tb';
import { IoIosWarning } from 'react-icons/io';
import { FaHourglassStart } from 'react-icons/fa';

// import { TbMusicOff } from 'react-icons/tb';

// 탐험 페이지
const Expedition = ({
  translatedAmiibo,
  translatedVillagers,
}: {
  translatedAmiibo: TranslatedAmiibo[];
  translatedVillagers: TranslateVillager[];
}) => {
  const [isStarted, setIsStarted] = useState(false);
  const [timerTime, setTimerTime] = useState(1);
  const [selectedAmiibo, setSelectedAmiibo] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const timerCounts = [1, 2, 3, 4];

  // 모험 캐릭터 선택
  const handleSelect = useCallback((character: string) => {
    setSelectedAmiibo((prev) => {
      if (prev.includes(character))
        return prev.filter((item) => item !== character);
      if (prev.length >= 5) {
        setModalOpen(true);
        return prev;
      }
      return [...prev, character];
    });
  }, []);

  return (
    <div className="grid grid-cols-[1fr_minmax(0,580px)_1fr] gap-4 p-3">
      {/* 캐릭터 선택 모달 */}
      <Modal
        isOpen={modalOpen}
        actionButton={
          <ModalButton
            onClick={() => {
              setModalOpen(false);
              console.log(modalOpen);
            }}
          >
            닫기
          </ModalButton>
        }
        hideCloseButton
      >
        <div className="flex flex-col items-center gap-3">
          <IoIosWarning className="text-3xl text-orange-700" />
          <span>
            최대 캐릭터 <span className="font-black text-orange-700">5명</span>{' '}
            까지 선택 가능합니다.
          </span>
        </div>
      </Modal>

      {/* 모험 준비 상단 메뉴 */}
      {!isStarted ? (
        <nav className="flex flex-col gap-1.5">
          <IconButton>
            <TbMusic className="text-[20px]" />
            <span className="text-[12px] font-bold whitespace-nowrap">
              음악
            </span>
          </IconButton>

          {/* 내 도감 */}
          <CollectionsModal isStarted={isStarted} />

          {/* 타이머 횟수 버튼 */}
          <div className="flex flex-col gap-1.5 pt-4">
            {timerCounts.map((num) => {
              const selectStyle =
                'border-b-[4px] border-t-[4px] bg-(--color-accent) text-white';
              return (
                <IconButton
                  key={num}
                  className={`${num === timerTime && selectStyle}`}
                  onClick={() => setTimerTime(num)}
                >
                  <FaHourglassStart className="text-[20px]" />
                  <span className="text-[12px] font-bold whitespace-nowrap">
                    x {num}
                  </span>
                </IconButton>
              );
            })}
          </div>
        </nav>
      ) : (
        <div className="invisible"></div>
      )}
      <div className="max-w-[600px] overflow-hidden rounded-2xl border-(--color-primary) bg-white">
        {/* 헤더 로고 */}
        <ExpeditionHeader />

        <main className="sm: px-7 pt-3 pb-3">
          {/* 캐릭터 화면 */}
          <CharacterPanel
            selectedAmiibo={selectedAmiibo}
            villagers={translatedVillagers}
            isTimerRunning={isTimerRunning}
          />

          {!isStarted ? (
            // 탐험 준비
            <ExpeditionSetup
              translatedAmiibo={translatedAmiibo}
              selectedAmiibo={selectedAmiibo}
              onSelect={handleSelect}
              timerTime={timerTime}
              onStart={setIsStarted}
            />
          ) : (
            // 탐험 시작
            <ExpeditionInProgress
              timerTime={timerTime}
              onStart={setIsStarted}
              isStarted={isStarted}
              collectibleItems={creatures}
              // isTimerRunning={isTimerRunning}
              onTimerRunningChange={setIsTimerRunning}
            />
          )}
        </main>

        <footer className="h-4 w-full bg-[url('/images/pattern.jpg')] bg-cover bg-center bg-no-repeat"></footer>
      </div>
      <div className="invisible"></div>
    </div>
  );
};

export default Expedition;
