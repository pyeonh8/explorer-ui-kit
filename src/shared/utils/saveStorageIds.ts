import { Creature } from 'animal-crossing/lib/types/Creature';

/**
 * 로컬 스토리지 저장 유틸
 * @param storageName 로컬 스토리지 key 이름
 * @param newRewards 새로 획득한 아이템 배열
 *
 */
const saveStorageId = (storageName: string, newRewards: Creature[] | null) => {
  if (typeof window === 'undefined') return [];

  // 기존 데이터
  const savedIds: string[] = JSON.parse(
    localStorage.getItem(storageName) || '[]'
  );

  // 새 아이템
  const newIds = newRewards?.map((item) => item.name) || [];

  // 중복 제거
  const updatedIds = Array.from(new Set([...savedIds, ...newIds]));

  // 로컬 스토리지 저장
  localStorage.setItem(storageName, JSON.stringify(updatedIds));

  // 저장 전 ID 목록
  return savedIds;
};

export default saveStorageId;
