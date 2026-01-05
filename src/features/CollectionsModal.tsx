import { useEffect, useRef, useState } from 'react';
import { creatures } from 'animal-crossing';
import { Creature } from 'animal-crossing/lib/types/Creature';
import Modal from '@/shared/ui/modal/Modal';
import { ItemGrid, CollectionCard } from '@/shared/ui/ItemGrid';
import IconButton from '@/shared/ui/IconButton';
import getSavedStorageIds from '@/shared/utils/getSavedStorageIds';
import useFilter from '@/shared/hooks/useFilter';
import useSort from '@/shared/hooks/useSort';
import { TbSortAscending } from 'react-icons/tb';
import { TbSortDescending } from 'react-icons/tb';
import { CREATURE_ATTRIBUTE } from '@/constants/creatureAttribute';
import { FaBook } from 'react-icons/fa';

const REWARD_POOL: Creature[] = creatures;

const collection = REWARD_POOL.map((item) => ({
  ...item,
  kRko: item.translations.kRko,
}));

const CollectionsModal = ({ isStarted }: { isStarted: boolean }) => {
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

    if (!isStarted) syncData();
  }, [isStarted]);

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
      className="max-h-[600px]"
      openButton={(open) => (
        <IconButton onClick={open}>
          <FaBook className="text-[20px]" />
          <span className="text-[12px] font-bold whitespace-nowrap">도감</span>
        </IconButton>
      )}
    >
      <p>찾은 수집품</p>

      <div className="flex gap-2">
        <button
          onClick={() => requestSort('kRko')}
          className="flex items-center gap-1"
        >
          이름순
          {sortConfig.direction === 'asc' ? (
            <TbSortAscending />
          ) : (
            <TbSortDescending />
          )}
        </button>

        {filterKeys.map((key) => (
          <button
            key={key}
            onClick={() => setFilterValue(key)}
            className={filterValue === key ? 'font-bold underline' : ''}
          >
            {CREATURE_ATTRIBUTE[key]}
          </button>
        ))}
      </div>

      <div
        ref={scrollRef}
        className="custom-scroll max-h-[400px] overflow-hidden overflow-y-scroll"
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
