import Image from 'next/image';
import { villagers, npcs } from 'animal-crossing';
import { AmiiboSelectionProps } from '@/types/features.type';
import { MdCancel } from 'react-icons/md';

const villagerMap = new Map(villagers.map((v) => [v.name, v]));
const isabelle = npcs.find((n) => n.name.toLocaleLowerCase() === 'isabelle');

const SelectedVillagers = ({
  selectedAmiibo,
  onSelect,
}: AmiiboSelectionProps) => {
  return (
    <div className="flex h-[100px] items-center justify-center gap-4">
      {selectedAmiibo.length > 0 ? (
        selectedAmiibo?.map((v) => {
          const target = villagerMap.get(v);
          if (!target?.iconImage) return null;

          return (
            <>
              <button
                key={target.filename}
                onClick={() => {
                  onSelect(target.name);
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
            </>
          );
        })
      ) : (
        <>
          {isabelle?.iconImage && (
            <Image
              src={isabelle.iconImage}
              alt={isabelle.name}
              height={55}
              width={55}
            />
          )}
          <div className="relative rounded-3xl bg-[#fff4c5] px-6 py-5 text-[17px] after:absolute after:top-1/2 after:-left-6 after:-translate-y-1/2 after:border-12 after:border-r-20 after:border-transparent after:border-r-[#fff4c5] after:content-['']">
            함께 모험을 떠날 친구들을 선택해주세요!
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedVillagers;
