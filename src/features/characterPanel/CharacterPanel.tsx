import { useMemo, useState } from 'react';
import Image from 'next/image';
import { CharacterPanelProps } from '@/types/features.type';
import { CHARACTER_HEIGHT } from '@/constants/characterHeights';

const CharacterPanel = ({
  selectedCharacters,
  villagers,
  isTimerRunning,
}: CharacterPanelProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const villagerMap = useMemo(
    () => new Map(villagers.map((v) => [v.koName, v])),
    [villagers]
  );

  return (
    <div className="relative h-[150px] w-[full] overflow-hidden rounded-[10px] sm:h-[170px]">
      {/* 배경 */}
      <div className="absolute inset-0 scale-105 bg-[url('/images/character-bg01.jpg')] bg-cover bg-center opacity-80 blur-[3px]"></div>

      {/* 캐릭터 */}
      <div className="relative z-10 flex h-full items-end justify-center gap-4 px-5">
        {selectedCharacters?.map((v, index) => {
          const target = villagerMap.get(v);
          if (!target?.image_url) return null;

          const isLoaded = loadedImages.has(target?.id || '');
          const height = CHARACTER_HEIGHT[target?.species || ''] || 120;

          return (
            <div
              key={target?.id}
              className="relative bottom-3 flex items-end sm:bottom-4.5"
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
                style={{ height: `auto`, width: `auto`, maxHeight: '90%' }}
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
