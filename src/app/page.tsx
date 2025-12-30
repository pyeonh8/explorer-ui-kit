import amiiboService from '@/shared/api/amiiboService';
import nookipediaVillagersService from '@/shared/api/nookipediaVillagersService';
// import nookipediaItemsService from '@/shared/api/nookipediaItemsService';
import filterAmiiboCard from '@/shared/utils/filterAmiiboCard';
import { TranslatedAmiibo } from '@/types/api.types';
import Expedition from '@/features/Expedition';
import dataTransformer from '@/shared/utils/dataTransformer';

export default async function AmiiboPage() {
  const amiiboData = await amiiboService();
  const nookipediaVillagersData = await nookipediaVillagersService();
  // const nookipediaItemData = await nookipediaItemsService();

  if (!amiiboData || amiiboData.length === 0 || !nookipediaVillagersData)
    throw new Error('데이터가 존재하지 않습니다.');

  // amiiboData 필터링 (속성 및 한국어 이름)
  const finalAmiibo: TranslatedAmiibo[] = filterAmiiboCard(amiiboData);

  // Nookipedia 속성 및 한국어 이름 추가
  const translatedVillagers = dataTransformer(nookipediaVillagersData, 'name');

  // Nookipedia 수집품
  // const translatedCollectibleItems = dataTransformer(collectibleItems, 'name');

  return (
    <div>
      <Expedition
        translatedAmiibo={finalAmiibo}
        translatedVillagers={translatedVillagers}
        // collectibleItems={nookipediaItemData}
      />
    </div>
  );
}
