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
    <div className="relative min-h-[200px] w-full overflow-hidden rounded-[10px] bg-[linear-gradient(0deg,rgba(146,218,205,1)_0%,rgba(192,240,183,1)_50%,rgba(255,255,173,1)_100%)]">
      {/* 배경 */}
      <div className="absolute inset-0 scale-105 bg-[url('/images/character-bg.jpg')] bg-cover bg-center opacity-80 blur-[4px]"></div>

      {/* 캐릭터 */}
      <div className="relative z-10 flex gap-4">
        {selectedAmiibo?.map((v) => {
          const target = villagerMap.get(v);

          return (
            <div key={target?.id} className="flex flex-col items-center">
              <div className="flex h-[80px] w-[60px] items-end justify-center rounded-lg bg-gray-50/50">
                {target?.image_url && (
                  <Image
                    src={target.image_url}
                    alt={target.name}
                    width={60}
                    height={80}
                  />
                )}
              </div>
              <span className="mt-2 text-[11px] font-medium">
                {target?.koName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterPanel;
