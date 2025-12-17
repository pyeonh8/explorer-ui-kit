'use client';

import { useState } from 'react';
import Image from 'next/image';
import kRkoVillagers from '@/shared/utils/kRkoVillagers';
import { AmiiboProps } from '@/types/api.types';

const AmiiboCardList = ({
  initialAmiibo,
}: {
  initialAmiibo: AmiiboProps[];
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (character: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(character))
        return prev.filter((item) => item !== character);
      if (prev.length >= 5) {
        alert('최대 5개만 선택이 가능합니다.');
        return prev;
      }
      return [...prev, character];
    });
  };
  console.log(selectedIds);

  return (
    <div className="grid w-[600px] grid-cols-4 gap-3">
      {initialAmiibo?.map((amiibo) => {
        const isSelected = selectedIds.includes(amiibo.character);

        return (
          <button
            key={amiibo.head + amiibo.tail}
            onClick={() => {
              handleSelect(amiibo.character);
            }}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <div className="overflow- relative aspect-[69/97] w-full rounded-[5px] bg-[var(--color-secondary)]">
              <Image
                src={amiibo.image}
                alt={amiibo.character}
                fill={true}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-contain"
              />
            </div>
            <div className="text-center font-bold">
              {kRkoVillagers(amiibo.character)}
              {isSelected ? '  선택!!' : ''}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default AmiiboCardList;
