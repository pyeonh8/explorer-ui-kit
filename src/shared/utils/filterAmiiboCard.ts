import { AmiiboProps, TranslatedAmiibo } from '@/types/api.types';
import dataTransformer from './dataTransformer';

/**
 * 아미보 데이터에서 카드 타입만 추출하고 중복 캐릭터와 npc를 제거하는 유틸리티
 * @param {AmiiboProps[]} amiibos - 원본 아미보 배열
 * @returns {AmiiboProps[]} 필터링 및 중복 제거된 아미보 배열
 */
const filterAmiiboCard = (amiibos: AmiiboProps[]): TranslatedAmiibo[] => {
  if (!amiibos || !Array.isArray(amiibos)) return [];

  const translatedAmiibo = dataTransformer(amiibos, 'character');

  const seenCharacters = new Set<string>();

  // 카드 타입 필터링, Timmy & Tommy 삭제
  return translatedAmiibo.filter((amiibo) => {
    // if (!amiibo || !amiibo.type) return false;
    const isCard = amiibo.type && amiibo.type.includes('Card');

    const isSpecialNPC = amiibo.character !== 'Timmy & Tommy';
    const isNPCs = amiibo.personality !== 'npc';

    // 중복 체크, 중복이 아닌 새로운 캐릭터만 등록
    const isNewCharacter = !seenCharacters.has(amiibo.character);

    if (isCard && isSpecialNPC && isNewCharacter && isNPCs) {
      seenCharacters.add(amiibo.character);
      return true;
    }

    return false;
  });
};

export default filterAmiiboCard;
