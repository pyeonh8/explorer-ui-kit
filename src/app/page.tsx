import amiiboService from '@/shared/api/amiiboService';
import nookipediaVillagersService from '@/shared/api/nookipediaVillagersService';
import nookipediaItemsService from '@/shared/api/nookipediaItemsService';
import filterAmiiboCard from '@/shared/utils/filterAmiiboCard';
import { AmiiboProps } from '@/types/api.types';
import Expedition from '@/features/Expedition';

export default async function AmiiboPage() {
  const amiiboData = await amiiboService();
  const nookipediaVillagersData = await nookipediaVillagersService();
  const nookipediaItemData = await nookipediaItemsService();

  const finalAmiibo: AmiiboProps[] = filterAmiiboCard(amiiboData);

  if (!amiiboData || amiiboData.length === 0 || !nookipediaVillagersData)
    throw new Error('데이터가 존재하지 않습니다.');

  return (
    <div>
      <Expedition
        initialAmiibo={finalAmiibo}
        villagers={nookipediaVillagersData}
        collectibleItems={nookipediaItemData}
      />
    </div>
  );
}
