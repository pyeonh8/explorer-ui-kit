'use client';

import { useCallback, useState } from 'react';
import { AmiiboProps } from '@/types/api.types';
import AmiiboCardList from './AmiiboCardList';

// 탐험 준비 화면
const ExpeditionSetup = ({
  initialAmiibo,
}: {
  initialAmiibo: AmiiboProps[];
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
    <AmiiboCardList
      initialAmiibo={initialAmiibo}
      selectedAmiibo={selectedAmiibo}
      onSelect={handleSelect}
    />
  );
};

export default ExpeditionSetup;
