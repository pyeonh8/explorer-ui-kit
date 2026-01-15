import { useEffect, useRef, useState } from 'react';
import { creatures } from 'animal-crossing';
import { Creature } from 'animal-crossing/lib/types/Creature';
import Modal from '@/shared/ui/modal/Modal';
import { ItemGrid, CollectionCard } from '@/shared/ui/ItemGrid';
import Button from '@/shared/ui/Button';
import IconButton from '@/shared/ui/IconButton';
import SortButton from '@/shared/ui/SortButton';
import getSavedStorageIds from '@/shared/utils/getSavedStorageIds';
import useFilter from '@/shared/hooks/useFilter';
import useSort from '@/shared/hooks/useSort';
import { CREATURE_ATTRIBUTES } from '@/constants/creatureAttributes';
import { FaBook } from 'react-icons/fa';
import { IoIosBug } from 'react-icons/io';
import { IoFish } from 'react-icons/io5';
import { FaDisease } from 'react-icons/fa';

const REWARD_POOL: Creature[] = creatures;

const collection = REWARD_POOL.map((item) => ({
  ...item,
  kRko: item.translations.kRko,
}));

const CREATURE_ICON: Record<string, React.ReactNode> = {
  Insects: <IoIosBug />,
  Fish: <IoFish />,
  'Sea Creatures': <FaDisease />,
};

const CollectionsModal = ({
  isAdventureStarted,
}: {
  isAdventureStarted: boolean;
}) => {
  const [savedCollections, setSaveCollections] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = getSavedStorageIds('my-treasure-box');
      return saved || [];
    }
    return [];
  });

  // 로컬 스토리지 데이터 싱크
  useEffect(() => {
    const syncData = () => {
      const saved = getSavedStorageIds('my-treasure-box');
      if (saved) setSaveCollections(saved);
    };

    if (!isAdventureStarted) syncData();
  }, [isAdventureStarted]);

  // 필터
  const filterKeys = Object.keys(CREATURE_ATTRIBUTES);
  const { filteredData, filterValue, setFilterValue } = useFilter(
    collection,
    'sourceSheet'
  );

  // 필터 초깃값 : Insects
  useEffect(() => {
    setFilterValue('Insects');
  }, [setFilterValue]);

  // 스크롤 초기화
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
  }, [filterValue]);

  // 정렬
  const { sortedData, requestSort, sortConfig } = useSort(filteredData, {
    key: 'kRko',
    direction: 'asc',
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Modal
      title="My 도감"
      openButton={(open) => (
        <IconButton
          aria-label="도감 열기"
          aria-haspopup="dialog"
          onClick={open}
          className="gap-1.5 pl-2"
        >
          <FaBook aria-hidden="true" className="text-[18px] sm:text-[20px]" />
          <span className="hidden text-[12px] font-bold whitespace-nowrap sm:block">
            도감
          </span>
        </IconButton>
      )}
    >
      {/* 모달 헤더 */}
      <header className="flex items-center justify-center gap-2 border-b-2 border-(--color-font)/20 pb-3 text-2xl">
        <FaBook />
        <h2 className="font-bold">My 도감</h2>
      </header>

      {/* 도감 메뉴 */}
      <nav aria-label="도감 카테고리 선택">
        <ul className="flex justify-center gap-4 py-4">
          {filterKeys.map((key) => (
            <li key={key} className="flex w-18 justify-center text-[13px]">
              <Button
                aria-pressed={filterValue === key}
                onClick={() => setFilterValue(key)}
                className={`flex w-full flex-col items-center rounded-2xl pt-1.5 pb-1 transition-all hover:border-(--color-primary) hover:bg-(--color-accent) hover:text-white ${filterValue === key ? 'border-(--color-primary) bg-(--color-accent)! text-white' : 'border-(--color-font-secondary) bg-(--color-foreground-inverse) text-(--color-font-secondary)'}`}
              >
                <span aria-hidden="true" className="pb-0.5 text-[22px]">
                  {CREATURE_ICON[key]}
                </span>
                {CREATURE_ATTRIBUTES[key]}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 정렬 버튼 */}
      <div className="pb-2">
        <SortButton
          sortKey="kRko"
          requestSort={requestSort}
          sortConfig={sortConfig}
        />
      </div>

      {/* 수집 가능한 생물 목록 */}
      <article
        aria-label="도감 목록"
        ref={scrollRef}
        className="custom-scroll max-h-[350px] overflow-hidden overflow-y-scroll"
      >
        <ItemGrid columns={4}>
          {sortedData.map((item, index) => {
            const myItems = savedCollections.includes(item.name);

            return (
              <CollectionCard
                key={`${item.internalId}-${index} ${item.name}`}
                item={item}
                isCollected={myItems}
              />
            );
          })}
        </ItemGrid>
      </article>
    </Modal>
  );
};

export default CollectionsModal;
