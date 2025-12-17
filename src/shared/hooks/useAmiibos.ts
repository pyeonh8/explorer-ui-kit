import { useState, useEffect, useMemo } from 'react';
import { amiiboService } from '../api/amiiboService';
import { AmiiboProps } from '@/types/api.types';
import { useAmiibosProps } from '@/types/hooks.types';

const useAmiibos = (): useAmiibosProps => {
  const [amiibos, setAmiibos] = useState<AmiiboProps[]>([]);
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

  return { finalAmiibo, isLoading, error };
};

export default useAmiibos;
