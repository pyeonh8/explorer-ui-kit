'use client';

import { useMemo } from 'react';
import { AmiiboCardListProps } from '@/types/features.type';
import AmiiboCard from './AmiiboCard';
import useSort from '@/shared/hooks/useSort';
import useFilter from '@/shared/hooks/useFilter';
import getVillagerExtraInfo from '@/shared/utils/getVillagerExtraInfo';
import { PERSONALITY_TRANSLATIONS } from '@/constants/amiibo';

const AmiiboCardList = ({
  initialAmiibo,
  selectedAmiibo: selectedIds,
  onSelect,
}: AmiiboCardListProps) => {
  // amiibo 데이터에 한글 이름, 성격 추가
  const translatedAmiibo = useMemo(() => {
    return initialAmiibo.map((amiibo) => {
      const { koName, personality } = getVillagerExtraInfo(amiibo.character);

      return {
        ...amiibo,
        koName,
        personality,
      };
    });
  }, [initialAmiibo]);

  // 필터
  // filterValue
  const { filteredData, options, setFilterValue } = useFilter(
    translatedAmiibo,
    'personality'
  );

  // 정렬
  const { sortedData, requestSort, sortConfig } = useSort(filteredData, {
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

      <div className="filter-buttons flex gap-3">
        {options.map((option) => (
          <button key={option} onClick={() => setFilterValue(option)}>
            {PERSONALITY_TRANSLATIONS[option] || option}
          </button>
        ))}
      </div>

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
