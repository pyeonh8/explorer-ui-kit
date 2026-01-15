import { useCallback, useMemo, useRef, useState } from 'react';
import { CharacterCardListProps } from '@/types/features.type';
import CharacterCard from './CharacterCard';
import useSort from '@/shared/hooks/useSort';
import useFilter from '@/shared/hooks/useFilter';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import useClickOutside from '@/shared/hooks/useClickOutside';
import Button from '@/shared/ui/Button';
import SortButton from '@/shared/ui/SortButton';
import { PERSONALITY_TRANSLATIONS } from '@/constants/characterPersonalities';
import { FaCaretDown } from 'react-icons/fa';
import { FaCaretUp } from 'react-icons/fa';

const CharacterCardList = ({
  translatedAmiibo,
  selectedCharacters,
  onCharacterSelect,
}: CharacterCardListProps) => {
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
      <div
        role="group"
        aria-label="캐릭터 목록 정렬 및 필터"
        className="flex justify-between gap-2 pt-5 pb-1.5"
      >
        {/* 정렬 정렬 */}
        <SortButton
          sortKey="koName"
          requestSort={requestSort}
          sortConfig={sortConfig}
        />

        {/* 성격순 필터 */}
        <div ref={filterRef} className="group relative mr-1 w-max">
          <Button
            aria-label={`성격 필터 메뉴: ${PERSONALITY_TRANSLATIONS[filterValue]}. 클릭 시 목록 ${isFilterOpen ? '닫기' : '열기'}`}
            aria-haspopup="listbox"
            aria-expanded={isFilterOpen}
            variant="plain"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="flex w-21 translate-x-px items-center justify-between rounded-sm bg-(--color-secondary) px-1.5 py-1 text-[14px] font-bold"
          >
            <span className="translate-y-0.5">
              {PERSONALITY_TRANSLATIONS[filterValue]}
            </span>
            <span aria-hidden="true" className="text-(--color-accent)">
              {isFilterOpen ? <FaCaretUp /> : <FaCaretDown />}
            </span>
          </Button>
          {isFilterOpen && (
            <ul
              role="listbox"
              className="absolute right-0 z-99 flex w-full flex-col text-[15px] whitespace-nowrap shadow-xl"
            >
              {filterKeys.map((key) => (
                <li key={key} role="none">
                  <Button
                    role="option"
                    aria-selected={filterValue === key}
                    variant="plain"
                    onClick={() => {
                      setFilterValue(key);
                      setIsFilterOpen(false);
                    }}
                    className={`${filterValue === key ? 'font-bold underline' : ''} w-full bg-white px-1.5 py-1 text-left text-[14px] text-(--color-font)/85 hover:underline`}
                  >
                    {PERSONALITY_TRANSLATIONS[key]}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 캐릭터 카드 목록 */}
      <section
        aria-labelledby="character-list-title"
        className="custom-scroll h-[550px] max-h-[calc(100vh-620px)] min-h-[250px] overflow-hidden overflow-y-scroll p-1"
      >
        <h3 id="character-list-title" className="sr-only">
          캐릭터 선택 목록
        </h3>

        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {slicedData?.map((amiibo) => {
            const isSelected = selectedCharacters.includes(amiibo.koName);

            return (
              <li key={amiibo.head + amiibo.tail}>
                <CharacterCard
                  amiibo={amiibo}
                  isSelected={isSelected}
                  onCharacterSelect={onCharacterSelect}
                />
              </li>
            );
          })}
        </ul>
        {hasMore && (
          <p
            ref={observerRef}
            aria-live="polite"
            className="flex h-15 items-center justify-center"
          >
            <span>아미보 불러오는 중...</span>
          </p>
        )}
      </section>
    </>
  );
};

export default CharacterCardList;
