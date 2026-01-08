import { getNookipediaData } from './client';
import {
  NookipediaVillagersProps,
  NookipediaVillagersResponse,
} from '@/types/api.types';

export default async function nookipediaVillagersService(): Promise<
  NookipediaVillagersProps[]
> {
  const data = await getNookipediaData<NookipediaVillagersResponse>(
    'villagers?game=nh&nhdetails=true'
  );
  return data;
  // const data = await getNookipediaData<any>('');
  // if (!data.cargoquery) return [];
  // return data.cargoquery.map((item: any) => ({
  //   name: item.title.name,
  //   id: item.title.name, // Cargo에는 id가 없으므로 name 사용
  //   image_url: `https://nookipedia.com/wiki/Special:Redirect/file/${item.title.image}`,
  //   species: item.title.species,
  //   nh_details: {
  //     icon_url: `https://nookipedia.com/wiki/Special:Redirect/file/${item.title.icon || item.title.image}`,
  //   },
  // }));
}
