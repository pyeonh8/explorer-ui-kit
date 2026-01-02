import { AmiiboCardListProps } from '@/types/features.type';
import AmiiboCard from './AmiiboCard';
import useSort from '@/shared/hooks/useSort';
import useFilter from '@/shared/hooks/useFilter';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import { PERSONALITY_TRANSLATIONS } from '@/constants/amiiboPersonality';

const AmiiboCardList = ({
  translatedAmiibo,
  selectedAmiibo: selectedIds,
  onSelect,
}: AmiiboCardListProps) => {
  // 필터
  const filterKeys = Object.keys(PERSONALITY_TRANSLATIONS);
  const { filteredData, setFilterValue, filterValue } = useFilter(
    translatedAmiibo,
    'personality'
  );

  // 정렬
  const { sortedData, requestSort, sortConfig } = useSort(filteredData, {
    key: 'koName',
    direction: 'asc',
  });

  const { slicedData, observerRef, hasMore } = useInfiniteScroll(
    sortedData,
    20
  );

  return (
    <div>
      <button onClick={() => requestSort('koName')}>
        이름순
        {sortConfig.direction === 'asc' ? '↑' : '↓'}
      </button>

      <div className="filter-buttons flex gap-3">
        {filterKeys.map((key) => (
          <button
            key={key}
            onClick={() => setFilterValue(key)}
            className={filterValue === key ? 'font-bold underline' : ''}
          >
            {PERSONALITY_TRANSLATIONS[key]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {slicedData?.map((amiibo) => {
          const isSelected = selectedIds.includes(amiibo.character);

          return (
            <AmiiboCard
              key={amiibo.head + amiibo.tail}
              amiibo={amiibo}
              isSelected={isSelected}
              onSelect={onSelect}
            />
          );
        })}
      </div>
      {hasMore && (
        <div
          ref={observerRef}
          className="flex h-20 items-center justify-center"
        >
          <span>아미보 불러오는 중... ⏳</span>
        </div>
      )}
    </div>
  );
};

export default AmiiboCardList;
