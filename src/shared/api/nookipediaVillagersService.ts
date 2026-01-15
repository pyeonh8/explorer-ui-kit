import { getNookipediaData } from './client';
import {
  NookipediaVillagersProps,
  NookipediaVillagersResponse,
} from '@/types/api.types';

export default async function nookipediaVillagersService(): Promise<
  NookipediaVillagersProps[]
> {
  const data =
    await getNookipediaData<NookipediaVillagersResponse>('villagers');
  return data;
}
