import amiiboService from '@/shared/api/amiiboService';
import nookipediaVillagersService from '@/shared/api/nookipediaVillagersService';
import filterAmiiboCard from '@/shared/utils/filterAmiiboCard';
import { AmiiboProps } from '@/types/api.types';
import ExpeditionSetup from '@/features/ExpeditionSetup';

export default async function AmiiboPage() {
  const amiiboData = await amiiboService();
  const nookipediaData = await nookipediaVillagersService();

  // console.log(nookipediaData);

  const finalAmiibo: AmiiboProps[] = filterAmiiboCard(amiiboData);

  if (!amiiboData || amiiboData.length === 0)
    throw new Error('데이터가 존재하지 않습니다.');

  return (
    <div>
      {/* <h1 className="pb-10 text-3xl font-bold text-blue-500 underline">
        Hello world!
      </h1> */}
      <ExpeditionSetup initialAmiibo={finalAmiibo} villagers={nookipediaData} />
    </div>
  );
}
