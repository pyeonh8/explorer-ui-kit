import amiiboService from '@/shared/api/amiiboService';
import ExpeditionSetup from '@/features/ExpeditionSetup';
import filterAmiiboCard from '@/shared/utils/filterAmiiboCard';
import { AmiiboProps } from '@/types/api.types';

export default async function AmiiboPage() {
  const rawData = await amiiboService();
  const finalAmiibo: AmiiboProps[] = filterAmiiboCard(rawData);

  if (!rawData || rawData.length === 0)
    throw new Error('데이터가 존재하지 않습니다.');

  return (
    <div>
      <h1 className="pb-10 text-3xl font-bold text-blue-500 underline">
        Hello world!
      </h1>
      <ExpeditionSetup initialAmiibo={finalAmiibo} />
    </div>
  );
}
