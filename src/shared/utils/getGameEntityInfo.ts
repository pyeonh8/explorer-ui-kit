import { villagers, npcs } from 'animal-crossing';
import { getGameEntityInfoProps } from '@/types/utils.types';

interface extraMap {
  [Key: string]: string;
}

// 캐릭터의 정식 이름과 다른 캐릭터들
const extra: extraMap = {
  Pave: 'Pavé',
  'K.K. Slider': 'K.K.',
  'Spork/Crackle': 'Spork',
  'Don Resetti': 'Don',
  OHare: "O'Hare",
};

// 함수 밖에서 미리 Map 생성
const all = [...villagers, ...npcs];
const allMap = new Map(all.map((item) => [item.name.toLowerCase(), item]));

/**
 * 캐릭터 및 아이템 이름을 기반으로 한국어 이름과 성격 정보를 추출하는 유틸리티 함수
 * 1. 외부 'extra' 맵을 통해 라이브러리 정식 명칭과 일치하지 않는 이름을 보정합니다.
 * 2. animal-crossing 라이브러리 데이터에서 매칭되는 캐릭터를 찾습니다.
 * 3. 주민(Villager)은 성격을, NPC는 'npc'라는 고정값을 반환합니다.
 *
 * @param searchName 아미보 데이터에서 넘어오는 영문 캐릭터 이름
 * @returns 번역된 이름(koName)과 성격(personality) 객체
 *
 * @example
 * const info = getGameEntityInfo("Isabelle");
 * // 결과: { koName: "여울", personality: "npc" }
 */
const getGameEntityInfo = (searchName: string): getGameEntityInfoProps => {
  const finalSearchName = (extra[searchName] || searchName).toLowerCase();
  const target = allMap.get(finalSearchName);

  if (target) {
    let type = 'npc';
    if ('personality' in target) {
      type = target.personality;
    }
    // else if (
    //   'sourceSheet' in target &&
    //   (target.sourceSheet === 'Fish' ||
    //     target.sourceSheet === 'Insects' ||
    //     target.sourceSheet === 'Sea Creatures')
    // ) {
    //   type = 'creature';
    // }

    return {
      koName: target.translations.kRko,
      personality: type,
    };
  }

  console.warn(`[getVillagerExtraInfo] 정보를 찾을 수 없음: ${searchName}`);
  return { koName: searchName, personality: 'Unknown' };
};

export default getGameEntityInfo;
