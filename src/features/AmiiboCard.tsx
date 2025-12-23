'use client';

import { memo } from 'react';
import Image from 'next/image';
import { AmiiboCardProps } from '@/types/features.type';

const AmiiboCard = ({
  amiibo,
  selectedAmiibo: isSelected,
  onSelect,
}: AmiiboCardProps) => {
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
        {amiibo.koName}
        {isSelected ? '  선택!!' : ''}
      </div>
    </button>
  );
};

export default memo(AmiiboCard);
