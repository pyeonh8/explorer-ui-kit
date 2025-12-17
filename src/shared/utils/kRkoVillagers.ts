import { villagers, npcs } from 'animal-crossing';
import { villagerProps } from '@/types/utils.types';

interface extraMap {
  [Key: string]: string;
}

const kRkoVillagers = (characterName: string): string => {
  const all = [...villagers, ...npcs];

  // 번외 변역
  const extra: extraMap = {
    Pave: 'Pavé',
    'K.K. Slider': 'K.K.',
    'Spork/Crackle': 'Spork',
    'Don Resetti': 'Don',
    OHare: "O'Hare",
  };

  const foundKey = Object.keys(extra).find((key) => key === characterName);

  let searchName: string = characterName;
  if (foundKey) {
    searchName = extra[foundKey];
  }

  const villager: villagerProps | undefined = all.find(
    (v) => v.name === searchName
  );

  if (villager) {
    return villager.translations.kRko;
  }

  console.log(characterName);
  return characterName;
};

export default kRkoVillagers;
