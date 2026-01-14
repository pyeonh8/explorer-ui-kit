import { useEffect, useRef, useState } from 'react';
import { creatures } from 'animal-crossing';
import { Creature } from 'animal-crossing/lib/types/Creature';
import Modal from '@/shared/ui/modal/Modal';
import { ItemGrid, CollectionCard } from '@/shared/ui/ItemGrid';
import Button from '@/shared/ui/Button';
import IconButton from '@/shared/ui/IconButton';
import getSavedStorageIds from '@/shared/utils/getSavedStorageIds';
import useFilter from '@/shared/hooks/useFilter';
import useSort from '@/shared/hooks/useSort';
import { TbSortAscending } from 'react-icons/tb';
import { TbSortDescending } from 'react-icons/tb';
import { CREATURE_ATTRIBUTE } from '@/constants/creatureAttribute';
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
  const filterKeys = Object.keys(CREATURE_ATTRIBUTE);
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
      openButton={(open) => (
        <IconButton onClick={open} className="gap-1.5 pl-2">
          <FaBook className="text-[18px] sm:text-[20px]" />
          <span className="hidden text-[12px] font-bold whitespace-nowrap sm:block">
            도감
          </span>
        </IconButton>
      )}
    >
      <span className="flex items-center justify-center gap-2 border-b-2 border-(--color-font)/20 pb-3 text-2xl">
        <FaBook />
        <h1 className="font-bold">My 도감</h1>
      </span>

      {/* 메뉴 */}
      <ul className="flex justify-center gap-4 py-4">
        {filterKeys.map((key) => (
          <li key={key} className="flex w-18 justify-center text-[13px]">
            <Button
              onClick={() => setFilterValue(key)}
              className={`flex w-full flex-col items-center rounded-2xl pt-1.5 pb-1 transition-all hover:border-(--color-primary) hover:bg-(--color-accent) hover:text-white ${filterValue === key ? 'border-(--color-primary) bg-(--color-accent)! text-white' : 'border-(--color-font-secondary) bg-(--color-foreground-inverse) text-(--color-font-secondary)'}`}
            >
              <span className="pb-0.5 text-[22px]">{CREATURE_ICON[key]}</span>
              {CREATURE_ATTRIBUTE[key]}
            </Button>
          </li>
        ))}
      </ul>

      {/* 이름순 정렬 */}
      <div className="pb-2">
        <Button
          variant="plain"
          onClick={() => requestSort('kRko')}
          className="flex gap-1 text-[15px] font-bold"
        >
          <span className="text-[20px]">
            {sortConfig.direction === 'asc' ? (
              <TbSortAscending />
            ) : (
              <TbSortDescending />
            )}
          </span>
          이름순
        </Button>
      </div>

      <div
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
      </div>
    </Modal>
  );
};

export default CollectionsModal;
