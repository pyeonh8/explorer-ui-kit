'use client';

import { useCallback, useState } from 'react';
import ExpeditionSetup from '@/features/ExpeditionSetup';
import ExpeditionInProgress from './ExpeditionInProgress';
import { AmiiboProps, NookipediaVillagersProps } from '@/types/api.types';
import CharacterPanel from './characterPanel/CharacterPanel';
import Button from '@/shared/ui/Button';
import IconButton from '@/shared/ui/IconButton';

// 탐험 페이지
const Expedition = ({
  initialAmiibo,
  villagers,
}: {
  initialAmiibo: AmiiboProps[];
  villagers: NookipediaVillagersProps[];
}) => {
  const [selectedAmiibo, setSelectedAmiibo] = useState<string[]>([]);
  const [timerTime, setTimerTime] = useState('15');
  const [isStarted, setIsStarted] = useState(false);

  const handleSelect = useCallback((character: string) => {
    setSelectedAmiibo((prev) => {
      if (prev.includes(character))
        return prev.filter((item) => item !== character);
      if (prev.length >= 5) {
        alert('최대 5개만 선택이 가능합니다.');
        return prev;
      }
      return [...prev, character];
    });
  }, []);

  return (
    <div className="w-max-[30px] m-auto w-[600px]">
      <div className="relative flex">
        <IconButton>음악</IconButton>

        {/* 토글버튼으로 변경 */}
        <Button className="font-bold" onClick={() => setTimerTime('15')}>
          15 분
        </Button>
        <Button className="font-bold" onClick={() => setTimerTime('30')}>
          30 분
        </Button>
      </div>

      {/* 캐릭터 화면 */}
      <CharacterPanel selectedAmiibo={selectedAmiibo} villagers={villagers} />

      {!isStarted ? (
        // 탐험 준비
        <ExpeditionSetup
          initialAmiibo={initialAmiibo}
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
        />
      )}
    </div>
  );
};

export default Expedition;
