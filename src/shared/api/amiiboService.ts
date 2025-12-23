import { getAmiiboData } from './client';
import { Amiibo, AmiiboApiResponse } from '@/types/api.types';

export async function amiiboService(): Promise<Amiibo[]> {
  const data = await getAmiiboData<AmiiboApiResponse>(
    'amiibo/?gameseries=Animal%20Crossing'
  );
  return data.amiibo;
}
