'use client';

import { useCallback, useState } from 'react';
import { AmiiboProps } from '@/types/api.types';
import AmiiboCard from './AmiiboCard';

const AmiiboCardList = ({
  initialAmiibo,
}: {
  initialAmiibo: AmiiboProps[];
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = useCallback((character: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(character))
        return prev.filter((item) => item !== character);
      if (prev.length >= 5) {
        alert('최대 5개만 선택이 가능합니다.');
        return prev;
      }
      return [...prev, character];
    });
  }, []);

  console.log(selectedIds);

  return (
    <div className="grid w-[600px] grid-cols-4 gap-3">
      {initialAmiibo?.map((amiibo) => {
        const isSelected = selectedIds.includes(amiibo.character);

        return (
          <AmiiboCard
            key={amiibo.head + amiibo.tail}
            amiibo={amiibo}
            isSelected={isSelected}
            onSelect={handleSelect}
          />
        );
      })}
    </div>
  );
};

export default AmiiboCardList;
