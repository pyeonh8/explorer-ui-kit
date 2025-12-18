'use client';

import { memo } from 'react';
import Image from 'next/image';
import { AmiiboProps } from '@/types/api.types';
import kRkoVillagers from '@/shared/utils/kRkoVillagers';

const AmiiboCard = ({
  amiibo,
  isSelected,
  onSelect,
}: {
  amiibo: AmiiboProps;
  isSelected: boolean;
  onSelect: (character: string) => void;
}) => {
  return (
    <button
      onClick={() => {
        onSelect(amiibo.character);
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
};

export default memo(AmiiboCard);
