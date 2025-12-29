import { getNookipediaData } from './client';
import { NookipediaItemProps, NookipediaItemResponse } from '@/types/api.types';

export default async function nookipediaItemsService(): Promise<
  NookipediaItemProps[]
> {
  const fishData = getNookipediaData<NookipediaItemResponse>('nh/fish');
  const bugsData = getNookipediaData<NookipediaItemResponse>('nh/bugs');
  const seaData = getNookipediaData<NookipediaItemResponse>('nh/sea');
  const individualsData = getNookipediaData<NookipediaItemResponse>(
    'nh/fossils/individuals'
  );

  const [fish, sea, bugs, individuals] = await Promise.all([
    fishData,
    seaData,
    bugsData,
    individualsData,
  ]);

  const allData = [...fish, ...sea, ...bugs, ...individuals];
  // const allData = [...fish, ...sea, ...bugs];

  return allData;
}
