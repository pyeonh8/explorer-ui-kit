import { NookipediaVillagersProps } from '@/types/api.types';
import Image from 'next/image';

const CharacterPanel = ({
  selectedAmiibo,
  villagers,
}: {
  selectedAmiibo: string[];
  villagers: NookipediaVillagersProps[];
}) => {
  const villagerMap = new Map(villagers.map((v) => [v.name, v]));

  return (
    <div className="bg-amber-100 p-[50px]">
      캐릭터 창
      <div className="flex gap-4">
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
                    unoptimized
                    priority
                    style={{ width: 'auto', maxHeight: '100%' }}
                    className="object-contain"
                  />
                )}
              </div>
              <span className="mt-2 text-[11px] font-medium">
                {target?.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterPanel;
