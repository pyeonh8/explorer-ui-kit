'use client';

import AmiiboCard from './AmiiboCard';
import { AmiiboCardListProps } from '@/types/features.type';

const AmiiboCardList = ({
  initialAmiibo,
  selectedAmiibo: selectedIds,
  onSelect,
}: AmiiboCardListProps) => {
  return (
    <div className="grid w-[600px] grid-cols-4 gap-3">
      {initialAmiibo?.map((amiibo) => {
        const isSelected = selectedIds.includes(amiibo.character);

        return (
          <AmiiboCard
            key={amiibo.head + amiibo.tail}
            amiibo={amiibo}
            selectedAmiibo={isSelected}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
};

export default AmiiboCardList;
