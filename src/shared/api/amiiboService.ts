import { getAmiiboData } from './client';
import { AmiiboProps, AmiiboApiResponse } from '@/types/api.types';

export default async function amiiboService(): Promise<AmiiboProps[]> {
  const data = await getAmiiboData<AmiiboApiResponse>(
    'amiibo/?gameseries=Animal%20Crossing'
  );
  return data.amiibo;
}
