import amiiboService from '@/shared/api/amiiboService';
import nookipediaVillagersService from '@/shared/api/nookipediaVillagersService';
import filterAmiiboCard from '@/shared/utils/filterAmiiboCard';
import { TranslatedAmiibo } from '@/types/api.types';
import Expedition from '@/features/Expedition';
import dataTransformer from '@/shared/utils/dataTransformer';

export default async function AmiiboPage() {
  const amiiboData = await amiiboService();
  const nookipediaVillagersData = await nookipediaVillagersService();

  if (!amiiboData || amiiboData.length === 0 || !nookipediaVillagersData)
    throw new Error('데이터가 존재하지 않습니다.');

  // amiiboData 필터링 (속성 및 한국어 이름)
  const finalAmiibo: TranslatedAmiibo[] = filterAmiiboCard(amiiboData);

  // Nookipedia 속성 및 한국어 이름 추가
  const translatedVillagers = dataTransformer(nookipediaVillagersData, 'name');

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/images/bg.png'),_linear-gradient(0deg,rgba(146,218,205,1)_0%,rgba(192,240,183,1)_50%,rgba(255,255,173,1)_100%)]">
      <Expedition
        translatedAmiibo={finalAmiibo}
        translatedVillagers={translatedVillagers}
      />
    </div>
  );
}
