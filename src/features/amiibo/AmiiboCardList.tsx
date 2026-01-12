import { useCallback, useMemo, useRef, useState } from 'react';
import { AmiiboCardListProps } from '@/types/features.type';
import AmiiboCard from './AmiiboCard';
import useSort from '@/shared/hooks/useSort';
import useFilter from '@/shared/hooks/useFilter';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import useClickOutside from '@/shared/hooks/useClickOutside';
import { PERSONALITY_TRANSLATIONS } from '@/constants/amiiboPersonality';
import { TbSortAscending } from 'react-icons/tb';
import { TbSortDescending } from 'react-icons/tb';
import { FaCaretDown } from 'react-icons/fa';
import { FaCaretUp } from 'react-icons/fa';

const AmiiboCardList = ({
  translatedAmiibo,
  selectedAmiibo: selectedIds,
  onSelect,
}: AmiiboCardListProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  // 필터 메뉴 외부 클릭시 닫힘
  useClickOutside({
    ref: filterRef,
    callback: useCallback(() => setIsFilterOpen(false), []),
  });

  // 필터
  const filterKeys = useMemo(() => Object.keys(PERSONALITY_TRANSLATIONS), []);
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
    <>
      {/* 필터 정렬 */}
      <div className="flex justify-between gap-2 pt-5 pb-1.5">
        {/* 이름순 정렬 */}
        <button
          onClick={() => requestSort('koName')}
          className="flex cursor-pointer items-center gap-1 pl-1 text-[15px] font-bold"
        >
          <span className="text-[20px]">
            {sortConfig.direction === 'asc' ? (
              <TbSortAscending />
            ) : (
              <TbSortDescending />
            )}
          </span>
          <span className="translate-y-px">이름순</span>
        </button>

        {/* 성격순 필터 */}
        <div ref={filterRef} className="group relative mr-1 w-max">
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="flex w-21 translate-x-px cursor-pointer items-center justify-between rounded-sm bg-(--color-secondary) px-1.5 py-1 text-[14px] font-bold"
          >
            <span className="translate-y-0.5">
              {PERSONALITY_TRANSLATIONS[filterValue]}
            </span>
            <span className="text-(--color-accent)">
              {isFilterOpen ? <FaCaretUp /> : <FaCaretDown />}
            </span>
          </button>
          {isFilterOpen && (
            <ul className="absolute right-0 z-99 flex w-full flex-col text-[15px] whitespace-nowrap shadow-xl">
              {filterKeys.map((key) => (
                <li key={key} className="cursor-pointer">
                  <button
                    onClick={() => {
                      setFilterValue(key);
                      setIsFilterOpen(false);
                    }}
                    className={`${filterValue === key ? 'font-bold underline' : ''} w-full cursor-pointer bg-white px-1.5 py-1 text-left text-[14px] text-(--color-font)/85 hover:underline`}
                  >
                    {PERSONALITY_TRANSLATIONS[key]}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 카드 목록 */}
      <div className="custom-scroll max-h-[calc(100vh-620px)] min-h-[250px] overflow-hidden overflow-y-scroll p-1">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {slicedData?.map((amiibo) => {
            const isSelected = selectedIds.includes(amiibo.koName);

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
            className="flex h-15 items-center justify-center"
          >
            <span>아미보 불러오는 중...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default AmiiboCardList;
