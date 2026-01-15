import Image from 'next/image';
import { villagers } from 'animal-crossing';
import { CharacterSlotProps } from '@/types/features.type';
import { MdCancel } from 'react-icons/md';
import InfoBubble from '@/shared/ui/InfoBubble';
import Button from '@/shared/ui/Button';

const villagerMap = new Map(villagers.map((v) => [v.translations.kRko, v]));

const CharacterSlot = ({
  selectedCharacters,
  onCharacterSelect,
}: CharacterSlotProps) => {
  return (
    <section
      aria-labelledby="selected-character-slot"
      className="my-2 flex min-h-[76px] justify-center"
    >
      <h3 id="selected-character-slot" className="sr-only">
        선택된 캐릭터 목록
      </h3>
      {selectedCharacters.length > 0 ? (
        <ul className="flex items-center justify-center gap-4">
          {selectedCharacters?.map((v) => {
            const target = villagerMap.get(v);
            if (!target?.iconImage) return null;

            return (
              <li key={target.filename}>
                <Button
                  aria-label={`${target.translations.kRko} 선택 취소`}
                  variant="plain"
                  onClick={() => {
                    onCharacterSelect(target.translations.kRko);
                  }}
                  className="group relative flex flex-col items-center rounded-2xl bg-(--color-secondary) p-1"
                >
                  <MdCancel
                    aria-hidden="true"
                    className="absolute top-1.5 right-1.5 rounded-2xl bg-white text-[15px] text-(--color-accent)/80 opacity-0 transition-all group-hover:opacity-100"
                  />
                  <Image
                    aria-hidden="true"
                    src={target.iconImage}
                    alt=""
                    height={50}
                    width={50}
                  />
                  <span
                    aria-hidden="true"
                    className="relative -top-1 text-[12px] font-bold"
                  >
                    {target.translations.kRko}
                  </span>
                </Button>
              </li>
            );
          })}
        </ul>
      ) : (
        <InfoBubble title="타이머 캐릭터 선택 안내">
          함께 모험을 떠날 친구들을 선택해주세요! (최대 5명)
        </InfoBubble>
      )}
    </section>
  );
};

export default CharacterSlot;
