import { AmiiboProps } from '@/types/api.types';

/**
 * 아미보 데이터에서 카드 타입만 추출하고 중복 캐릭터를 제거하는 유틸리티
 * @param {AmiiboProps[]} amiibos - 원본 아미보 배열
 * @returns {AmiiboProps[]} 필터링 및 중복 제거된 아미보 배열
 */
const filterAmiiboCard = (amiibos: AmiiboProps[]): AmiiboProps[] => {
  if (!amiibos || !Array.isArray(amiibos)) return [];

  const seenCharacters = new Set<string>();

  // 카드 타입 필터링, Timmy & Tommy 삭제
  return amiibos.filter((amiibo) => {
    const isCard = amiibo.type.includes('Card');
    const isSpecialNPC = amiibo.character !== 'Timmy & Tommy';

    // 중복 체크, 중복이 아닌 새로운 캐릭터만 등록
    const isNewCharacter = !seenCharacters.has(amiibo.character);

    if (isCard && isSpecialNPC && isNewCharacter) {
      seenCharacters.add(amiibo.character);
      return true;
    }

    return false;
  });
};

export default filterAmiiboCard;
