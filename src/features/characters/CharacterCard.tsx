import { memo } from 'react';
import Image from 'next/image';
import { CharacterCardProps } from '@/types/features.type';
import Button from '@/shared/ui/Button';
import { FaCheck } from 'react-icons/fa6';

const CharacterCard = ({
  amiibo,
  isSelected,
  onCharacterSelect,
}: CharacterCardProps) => {
  return (
    <Button
      aria-label={`${amiibo.koName} ${isSelected ? '선택됨' : ''}`}
      aria-pressed={isSelected}
      variant="plain"
      onClick={() => {
        onCharacterSelect(amiibo.koName);
      }}
      className={`flex w-full flex-col transition-transform ${isSelected ? 'hover:scale-100' : 'hover:scale-105'}`}
    >
      <div
        className={`relative aspect-69/97 w-full overflow-hidden rounded-[5px] bg-(--color-secondary)`}
      >
        {isSelected && (
          <>
            <FaCheck
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 z-10 -translate-1/2 rounded-4xl border-4 border-(--color-accent) bg-(--color-foreground) p-1 text-5xl text-(--color-accent)"
            />
            <div className="absolute inset-0 z-9 border-4 border-(--color-accent) bg-black/50" />
          </>
        )}

        <Image
          src={amiibo.image}
          alt=""
          fill={true}
          sizes="(max-width: 768px) 33vw, 25vw"
          className="object-cover object-left"
        />
      </div>
      <span
        aria-hidden="true"
        className={`text-center text-[16px] font-bold ${isSelected ? 'text-(--color-accent)' : 'text-(--color-font)'}`}
      >
        {amiibo.koName}
      </span>
    </Button>
  );
};

export default memo(CharacterCard);
