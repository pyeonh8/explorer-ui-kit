'use client';

import { useCallback, useState } from 'react';
import { AmiiboProps, NookipediaVillagersProps } from '@/types/api.types';
import AmiiboCardList from './amiibo/AmiiboCardList';
import CharacterPanel from './characterPanel/CharacterPanel';
import Button from '@/shared/ui/Button';
import Modal from '@/shared/ui/Modal';
import IconButton from '@/shared/ui/IconButton';

// 탐험 준비 화면
const ExpeditionSetup = ({
  initialAmiibo,
  villagers,
}: {
  initialAmiibo: AmiiboProps[];
  villagers: NookipediaVillagersProps[];
}) => {
  const [selectedAmiibo, setSelectedAmiibo] = useState<string[]>([]);

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

  console.log(selectedAmiibo);

  return (
    <div className="w-max-[30px] m-auto w-[600px]">
      <div className="relative flex">
        <IconButton>음악</IconButton>
        <Button className="font-bold">15 분</Button>
        <Button className="font-bold">30 분</Button>
      </div>
      <CharacterPanel selectedAmiibo={selectedAmiibo} villagers={villagers} />

      <Modal></Modal>

      <AmiiboCardList
        initialAmiibo={initialAmiibo}
        selectedAmiibo={selectedAmiibo}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default ExpeditionSetup;
