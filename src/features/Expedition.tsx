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
import CollectionsModal from './CollectionsModal';
import { RxLapTimer } from 'react-icons/rx';
import { TbMusic } from 'react-icons/tb';
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

  const timerCounts = [1, 2, 3, 4];

  // 모험 캐릭터 선택
  const handleSelect = useCallback((character: string) => {
    setSelectedAmiibo((prev) => {
      if (prev.includes(character))
        return prev.filter((item) => item !== character);
      if (prev.length >= 5) {
        <Modal>최대 5개만 선택이 가능합니다.</Modal>;
        return prev;
      }
      return [...prev, character];
    });
  }, []);

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 p-3">
      {/* 모험 준비 상단 메뉴 */}
      {!isStarted ? (
        <div className="flex flex-col gap-1.5">
          <IconButton>
            <TbMusic className="text-[20px]" />
            <span className="text-[12px] font-bold whitespace-nowrap">
              음악
            </span>
          </IconButton>
          {/* 내 도감 */}
          <CollectionsModal isStarted={isStarted} />
          {/* 토글버튼으로 변경 */}
          <div className="flex flex-col gap-1.5 pt-4">
            {timerCounts.map((num) => {
              const selectStyle =
                'border-b-[4px] border-t-[4px] bg-[#07B7B3] text-white';
              return (
                <IconButton
                  key={num}
                  className={`${num === timerTime && selectStyle}`}
                  onClick={() => setTimerTime(num)}
                >
                  <RxLapTimer className="text-[20px]" />
                  <span className="text-[12px] font-bold whitespace-nowrap">
                    x {num}
                  </span>
                </IconButton>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="invisible"></div>
      )}

      <div className="max-w-[650px] overflow-hidden rounded-2xl border-[var(--color-primary)] bg-white/100">
        {/* 헤더 로고 */}
        <ExpeditionHeader />

        <div className="px-7 pt-3 pb-6">
          {/* 캐릭터 화면 */}
          <CharacterPanel
            selectedAmiibo={selectedAmiibo}
            villagers={translatedVillagers}
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
            />
          )}
        </div>

        <div className="h-[20px] w-full bg-[url('/images/pattern.jpg')] bg-cover bg-center bg-no-repeat">
          123
        </div>
      </div>

      <div className="invisible"></div>
    </div>
  );
};

export default Expedition;
