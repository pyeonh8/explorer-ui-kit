'use Client';

import { useEffect, useMemo, useState } from 'react';
import { amiiboService } from '@/shared/api/amiiboService';
import { Amiibo } from '@/types/api.types';
import Image from 'next/image';

const AmiiboList = () => {
  const [amiibos, setAmiibos] = useState<Amiibo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAmiibos = async () => {
      try {
        const data = await amiiboService();
        setAmiibos(data);
      } catch (e) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadAmiibos();
  }, []);

  const finalAmiibo = useMemo(() => {
    // 타입 필터링
    const cardOnlyAmiibos = amiibos.filter((amiibo) =>
      amiibo.type.includes('Card')
    );

    // 타입 필터된 배열에서 캐릭터 중복 제거
    const uniqueAmiibos = [];
    const seenCharacters = new Set();

    for (const amiibo of cardOnlyAmiibos) {
      if (!seenCharacters.has(amiibo.character)) {
        seenCharacters.add(amiibo.character);
        uniqueAmiibos.push(amiibo);
      }
    }

    return uniqueAmiibos;
  }, [amiibos]);

  // 로딩 & 에러 처리
  if (isLoading) return <div> 로딩 중. . . </div>;
  if (error) return <div>{error}</div>;

  console.log();
  return (
    <div className="grid grid-cols-4 gap-3">
      {finalAmiibo.slice(0, 50).map((amiibo) => (
        <div key={amiibo.head + amiibo.tail}>
          <div className="overflow- relative aspect-[69/97] w-full rounded-[5px] bg-[var(--color-secondary)]">
            <Image
              src={amiibo.image}
              alt={amiibo.character}
              fill={true}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain"
            />
          </div>
          <div className="text-center font-bold">{amiibo.character}</div>
        </div>
      ))}
    </div>
  );
};

export default AmiiboList;
