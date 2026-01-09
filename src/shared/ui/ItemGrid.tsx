import Image from 'next/image';
import { Creature } from 'animal-crossing/lib/types/Creature';
import { CreatureExtraInfo } from '@/types/features.type';
import { ItemGridProps } from '@/types/common.types';

export const ItemGrid = ({ children, columns = 3 }: ItemGridProps) => {
  const gridCols = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  }[columns];

  return <ul className={`grid ${gridCols} gap-4`}>{children}</ul>;
};

// 보상 카드
export const RewardCard = ({ item }: { item: CreatureExtraInfo }) => {
  return (
    <li className="relative flex flex-col rounded-2xl bg-[#fff2bd] px-2 py-1">
      {item?.isNew && (
        <span className="absolute -top-1 -left-1 -rotate-20 rounded-lg bg-(--color-primary) px-2 py-1 text-[12px] leading-[13px] font-bold">
          New
        </span>
      )}
      <Image
        src={item?.iconImage}
        alt={item?.name}
        width={60}
        height={60}
        priority
        className="m-auto"
      />
      <span className="text-sm">{item?.translations.kRko}</span>
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
    // grayscale
    <li
      className={`flex flex-col items-center rounded-2xl bg-[#fff2bd] p-1 px-2 py-1 ${!isCollected && 'bg-(--color-foreground-inverse) opacity-35'}`}
    >
      <Image
        src={item.iconImage}
        width={80}
        height={80}
        alt={item.name}
        className={!isCollected ? `contrast-50 grayscale-100` : ''}
      />
      <p className="text-[12px] font-bold text-(--color-font)">
        {isCollected ? item.translations.kRko : '???'}
      </p>
    </li>
  );
};
