import { villagers, npcs } from 'animal-crossing';
import { VillagerExtraInfoProps } from '@/types/utils.types';

interface extraMap {
  [Key: string]: string;
}

/**
 * 캐릭터 이름을 기반으로 한국어 이름과 성격 정보를 추출하는 유틸리티 함수
 * @description
 * 1. 내부 'extra' 맵을 통해 라이브러리 정식 명칭과 일치하지 않는 이름을 보정합니다.
 * 2. animal-crossing 라이브러리 데이터에서 매칭되는 캐릭터를 찾습니다.
 * 3. 주민(Villager)은 성격을, NPC는 'npc'라는 고정값을 반환합니다.
 *
 * @param {string} characterName - 아미보 데이터에서 넘어오는 영문 캐릭터 이름
 * @returns {VillagerExtraInfoProps} 번역된 이름(koName)과 성격(personality) 객체
 *
 * @example
 * const info = getVillagerExtraInfo("Isabelle");
 * // 결과: { koName: "여울", personality: "npc" }
 */
const getVillagerExtraInfo = (
  characterName: string
): VillagerExtraInfoProps => {
  const all = [...villagers, ...npcs];

  // 캐릭터의 정식 이름과 다른 캐릭터들
  const extra: extraMap = {
    Pave: 'Pavé',
    'K.K. Slider': 'K.K.',
    'Spork/Crackle': 'Spork',
    'Don Resetti': 'Don',
    OHare: "O'Hare",
  };

  const searchName = extra[characterName] || characterName;

  const villager = all.find((v) => v.name === searchName);

  if (villager) {
    return {
      koName: villager.translations.kRko,
      personality: 'personality' in villager ? villager.personality : 'npc',
    };
  }

  console.error("personality: 'Unknown' 존재합니다.");
  return { koName: characterName, personality: 'Unknown' };
};

export default getVillagerExtraInfo;
