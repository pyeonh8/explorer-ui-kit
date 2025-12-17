'use client';

import Image from 'next/image';
import kRkoVillagers from '@/shared/utils/kRkoVillagers';
import useToggle from '@/shared/hooks/useToggle';
import { AmiiboProps } from '@/types/api.types';

const AmiiboItem = ({
  amiibo,
  onSelect,
}: {
  amiibo: AmiiboProps;
  onSelect: (character: string, value: boolean) => void;
}) => {
  const { value, toggle } = useToggle();

  return (
    <div className="grid w-[600px] grid-cols-4 gap-3">
      <button
        onClick={() => {
          toggle();
          onSelect(amiibo.character, value);
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
          {value ? '  선택!!' : ''}
        </div>
      </button>
    </div>
  );
};

export default AmiiboItem;
