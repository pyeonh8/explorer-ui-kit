import Image from 'next/image';
import { villagers } from 'animal-crossing';
import { AmiiboSelectionProps } from '@/types/features.type';
import { MdCancel } from 'react-icons/md';
import InfoBubble from '@/shared/ui/InfoBubble';

const villagerMap = new Map(villagers.map((v) => [v.translations.kRko, v]));

const SelectedVillagers = ({
  selectedAmiibo,
  onSelect,
}: AmiiboSelectionProps) => {
  return (
    <div className="my-2 flex min-h-[76px] justify-center">
      {selectedAmiibo.length > 0 ? (
        <div className="flex items-center justify-center gap-4">
          {selectedAmiibo?.map((v) => {
            const target = villagerMap.get(v);
            if (!target?.iconImage) return null;

            return (
              <button
                key={target.filename}
                onClick={() => {
                  onSelect(target.translations.kRko);
                }}
                className="group relative flex cursor-pointer flex-col items-center rounded-2xl bg-(--color-secondary) p-1"
              >
                <MdCancel className="absolute top-1.5 right-1.5 rounded-2xl bg-white text-[15px] text-(--color-accent)/80 opacity-0 transition-all group-hover:opacity-100" />
                <Image
                  src={target.iconImage}
                  alt={target.name}
                  height={50}
                  width={50}
                />
                <span className="relative -top-1 text-[12px] font-bold">
                  {target.translations.kRko}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <InfoBubble>함께 모험을 떠날 친구들을 선택해주세요!</InfoBubble>
      )}
    </div>
  );
};

export default SelectedVillagers;
