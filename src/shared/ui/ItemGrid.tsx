import Image from 'next/image';
import { Creature } from 'animal-crossing/lib/types/Creature';
import { CreatureExtraInfo } from '@/types/features.type';
import { ItemGridProps } from '@/types/common.types';
import { twMerge } from 'tailwind-merge';

export const ItemGrid = ({
  children,
  columns = 3,
  className,
}: ItemGridProps) => {
  const gridCols = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }[columns];

  const baseStyle = `grid ${gridCols} gap-4`;
  const finalClasses = twMerge(baseStyle, className);

  return <ul className={finalClasses}>{children}</ul>;
};

// 보상 카드
export const RewardCard = ({
  item,
  imageSize = 60,
}: {
  item: CreatureExtraInfo;
  imageSize?: number;
}) => {
  return (
    <li className="relative flex flex-col rounded-2xl bg-[#fff2bd] px-2 py-1">
      {item?.isNew && (
        <span
          aria-hidden={true}
          className="absolute -top-1 -left-1 -rotate-20 rounded-lg bg-(--color-primary) px-2 py-1 text-[12px] leading-[13px] font-bold"
        >
          New
        </span>
      )}
      <Image
        src={item?.iconImage}
        alt={`${item?.translations.kRko} ${item?.isNew ? '새로 얻은 생물' : ''}`}
        width={imageSize}
        height={imageSize}
        priority
        className="m-auto"
      />
      <span aria-hidden="true" className="text-[11px] sm:text-[13px]">
        {item?.translations.kRko}
      </span>
    </li>
  );
};

// 도감
export const CollectionCard = ({
  item,
  isCollected,
}: {
  item: Creature;
  isCollected: boolean;
}) => {
  return (
    <li
      className={`flex flex-col items-center rounded-2xl bg-[#fff2bd] p-1 px-2 py-1 ${!isCollected && 'bg-(--color-foreground-inverse) opacity-35'}`}
    >
      <Image
        src={item.iconImage}
        alt={`${isCollected ? item?.translations.kRko : '미획득 생물'}`}
        width={80}
        height={80}
        className={!isCollected ? `contrast-50 grayscale-100` : ''}
      />
      <span
        aria-hidden="true"
        className="text-[12px] font-bold text-(--color-font)"
      >
        {isCollected ? item.translations.kRko : '???'}
      </span>
    </li>
  );
};
