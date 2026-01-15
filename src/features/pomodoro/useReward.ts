import { useState } from 'react';
import { Creature } from 'animal-crossing/lib/types/Creature';
import { CreatureExtraInfo } from '@/types/features.type';
import saveStorageId from '@/shared/utils/saveStorageIds';
import { getRandomItems } from '@/shared/utils/random';

// 보상 랜덤 뽑기
const useReward = (collectibleItems: Creature[]) => {
  const [currentReward, setCurrentReward] = useState<
    CreatureExtraInfo[] | null
  >(null);

  // 아이템 랜덤 보상
  const generateReward = (count: number = 1) => {
    const rewards = getRandomItems(collectibleItems, count);

    // 얻은 보상 저장
    const previousIds = saveStorageId('my-treasure-box', rewards);

    // 새로운 보상 표시
    const processedRewards = rewards.map((item) => ({
      ...item,
      isNew: !previousIds.includes(item.name),
    }));

    setCurrentReward(processedRewards);

    return processedRewards;
  };

  return { currentReward, generateReward, setCurrentReward };
};

export default useReward;
