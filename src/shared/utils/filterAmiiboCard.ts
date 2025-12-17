import { AmiiboProps } from '@/types/api.types';

const filterAmiiboCard = (amiibos: AmiiboProps[]) => {
  if (!amiibos || !Array.isArray(amiibos)) return [];

  // 카드 타입 필터링, Timmy & Tommy 삭제
  const cardOnlyAmiibos = amiibos.filter(
    (amiibo) =>
      amiibo.type.includes('Card') && amiibo.character !== 'Timmy & Tommy'
  );

  // 타입 필터된 배열에서 캐릭터 중복 제거
  const uniqueAmiibos = [];
  const seenCharacters = new Set();

  for (const amiibo of cardOnlyAmiibos) {
    if (!seenCharacters.has(amiibo.character)) {
      seenCharacters.add(amiibo.character);
      uniqueAmiibos.push(amiibo);
    }
  }

  return uniqueAmiibos;
};

export default filterAmiiboCard;
