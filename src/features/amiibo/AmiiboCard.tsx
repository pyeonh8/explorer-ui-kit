import { memo } from 'react';
import Image from 'next/image';
import { AmiiboCardProps } from '@/types/features.type';
import { FaCheck } from 'react-icons/fa6';

const AmiiboCard = ({ amiibo, isSelected, onSelect }: AmiiboCardProps) => {
  return (
    <button
      onClick={() => {
        onSelect(amiibo.character);
      }}
      className={`cursor-pointer transition-transform ${isSelected ? 'hover:scale-100' : 'hover:scale-105'}`}
    >
      <div
        className={`relative aspect-69/97 w-full overflow-hidden rounded-[5px] bg-(--color-secondary)`}
      >
        {isSelected && (
          <>
            <FaCheck className="absolute top-1/2 left-1/2 z-10 -translate-1/2 rounded-4xl border-4 border-(--color-accent) bg-(--color-foreground) p-1 text-5xl text-(--color-accent)" />
            <div className="absolute inset-0 z-9 border-4 border-(--color-accent) bg-black/50" />
          </>
        )}

        <Image
          src={amiibo.image}
          alt={amiibo.character}
          fill={true}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-contain"
        />
      </div>
      <div
        className={`text-center text-[16px] font-bold ${isSelected ? 'text-(--color-accent)' : 'text-(--color-font)'}`}
      >
        {amiibo.koName}
      </div>
    </button>
  );
};

export default memo(AmiiboCard);
