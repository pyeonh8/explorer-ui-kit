'use Client';

import { useEffect, useState } from 'react';
import { amiiboService } from '@/shared/api/amiiboService';
import { Amiibo } from '@/types/api.types';

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

  // 로딩 & 에러 처리
  if (isLoading) return <div> 로딩 중. . . </div>;
  if (error) return <div>{error}</div>;

  // 타입 필터링
  const cardOnlyAmiibos = amiibos.filter((amiibo) => {
    return amiibo.type.includes('Card');
  });

  // 타입 필터된 배열에서 캐릭터 중복 제거
  const finalAmiibos = [];
  const seenCharacters = new Set();

  for (const amiibo of cardOnlyAmiibos) {
    if (!seenCharacters.has(amiibo.character)) {
      seenCharacters.add(amiibo.character);
      finalAmiibos.push(amiibo);
    }
  }

  return (
    <div className="grid">
      {finalAmiibos.map((amiibo) => (
        <div key={amiibo.head + amiibo.tail} className="pb-6">
          {/* <img src={amiibo.image} alt="" /> */}
          <div>{amiibo.character}</div>
        </div>
      ))}
    </div>
  );
};

export default AmiiboList;
