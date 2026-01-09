import { useMemo, useState } from 'react';
import Image from 'next/image';
import { TranslateVillager } from '@/types/api.types';
import { VILLAGERS_HEIGHT } from '@/constants/villagersHeight';

const CharacterPanel = ({
  selectedAmiibo,
  villagers,
  isTimerRunning,
}: {
  selectedAmiibo: string[];
  villagers: TranslateVillager[];
  isTimerRunning: boolean;
}) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const villagerMap = useMemo(
    () => new Map(villagers.map((v) => [v.name, v])),
    [villagers]
  );

  return (
    <div className="relative h-[200px] w-[full] overflow-hidden rounded-[10px]">
      {/* 배경 */}
      <div className="absolute inset-0 scale-105 bg-[url('/images/character-bg01.jpg')] bg-cover bg-center opacity-80 blur-[3px]"></div>

      {/* 캐릭터 */}
      <div className="relative z-10 flex h-full items-end justify-center gap-4 px-5 pb-6">
        {selectedAmiibo?.map((v, index) => {
          const target = villagerMap.get(v);
          if (!target?.image_url) return null;

          const isLoaded = loadedImages.has(target?.id || '');
          const height = VILLAGERS_HEIGHT[target?.species || ''] || 120;

          return (
            <div
              key={target?.id}
              className="relative flex items-end"
              style={{
                height: `${height}px`,
                width: 'auto',

                animation: isTimerRunning
                  ? `float 2s ease-in-out ${index * 0.3}s infinite`
                  : 'none',
              }}
            >
              {!isLoaded && (
                <div className="absolute inset-0 animate-pulse rounded bg-gray-200/80" />
              )}

              <Image
                src={target.image_url}
                alt={target.name}
                width={70}
                height={70}
                className={`relative object-contain transition-opacity duration-300 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ height: `auto`, width: `auto`, maxHeight: '100%' }}
                onLoad={() => {
                  setLoadedImages((prev) => new Set(prev).add(target.id));
                }}
                priority
                unoptimized
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterPanel;
