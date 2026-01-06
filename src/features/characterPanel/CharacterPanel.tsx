import { TranslateVillager } from '@/types/api.types';
import Image from 'next/image';

const CharacterPanel = ({
  selectedAmiibo,
  villagers,
}: {
  selectedAmiibo: string[];
  villagers: TranslateVillager[];
}) => {
  const villagerMap = new Map(villagers.map((v) => [v.name, v]));

  return (
    // bg-[linear-gradient(0deg,rgba(146,218,205,1)_0%,rgba(192,240,183,1)_50%,rgba(255,255,173,1)_100%)]
    <div className="relative h-[200px] w-full overflow-hidden rounded-[10px]">
      {/* 배경 */}
      <div className="absolute inset-0 scale-105 bg-[url('/images/character-bg01.jpg')] bg-cover bg-center opacity-80 blur-[3px]"></div>

      {/* 캐릭터 */}
      <div className="relative z-10 flex h-full items-center justify-center gap-6">
        {selectedAmiibo?.map((v) => {
          const target = villagerMap.get(v);

          return (
            // flex flex-col items-center
            <div key={target?.id} className="">
              {/* flex h-20 items-end justify-center rounded-lg bg-gray-50/50 */}
              <div className="">
                {target?.image_url && (
                  <Image
                    src={target.image_url}
                    alt={target.name}
                    width={60}
                    height={80}
                  />
                )}
              </div>
              {/* <span className="mt-2 text-[11px] font-medium">
                {target?.koName}
              </span> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterPanel;
