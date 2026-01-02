import { creatures } from 'animal-crossing';
import { Creature } from 'animal-crossing/lib/types/Creature';
import Modal from '@/shared/ui/modal/Modal';
import { ItemGrid, CollectionCard } from '@/shared/ui/ItemGrid';
import IconButton from '@/shared/ui/IconButton';
import { useEffect, useState } from 'react';
import getSavedStorageIds from '@/shared/utils/getSavedStorageIds';

const REWARD_POOL: Creature[] = creatures;

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

  return (
    <Modal
      className="max-h-[600px]"
      openButton={(open) => <IconButton onClick={open}>찾은 보물</IconButton>}
    >
      <p>찾은 수집품</p>
      <div className="max-h-[400px] overflow-hidden overflow-y-scroll">
        <ItemGrid columns={4}>
          {REWARD_POOL.map((item, index) => {
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
