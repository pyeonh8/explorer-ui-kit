'use client';

import AmiiboCard from './AmiiboCard';
import { AmiiboCardListProps } from '@/types/features.type';
import useSort from '@/shared/hooks/useSort';
import kRkoVillagers from '@/shared/utils/kRkoVillagers';
import { useMemo } from 'react';

const AmiiboCardList = ({
  initialAmiibo,
  selectedAmiibo: selectedIds,
  onSelect,
}: AmiiboCardListProps) => {
  // amiibo 데이터에 한국어 이름 데이터 추가
  const translatedAmiibo = useMemo(() => {
    return initialAmiibo.map((amiibo) => ({
      ...amiibo,
      koName: kRkoVillagers(amiibo.character),
    }));
  }, [initialAmiibo]);

  const { sortedData, requestSort, sortConfig } = useSort(translatedAmiibo, {
    key: 'koName',
    direction: 'asc',
  });

  return (
    <>
      <button onClick={() => requestSort('koName')}>
        이름순{' '}
        {sortConfig.key === 'koName' &&
          (sortConfig.direction === 'asc' ? '↑' : '↓')}
      </button>

      <div className="grid w-[600px] grid-cols-4 gap-3">
        {sortedData?.map((amiibo) => {
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
    </>
  );
};

export default AmiiboCardList;
