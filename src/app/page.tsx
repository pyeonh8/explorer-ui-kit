import amiiboService from '@/shared/api/amiiboService';
import nookipediaVillagersService from '@/shared/api/nookipediaVillagersService';
import filterAmiiboCard from '@/shared/utils/filterAmiiboCard';
import { TranslatedAmiibo } from '@/types/api.types';
import Expedition from '@/features/expedition/Expedition';
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[url('/images/bg.png'),_linear-gradient(0deg,rgba(146,218,205,1)_0%,rgba(192,240,183,1)_50%,rgba(255,255,173,1)_100%)]">
      <Expedition
        translatedAmiibo={finalAmiibo}
        translatedVillagers={translatedVillagers}
      />
      <footer className="mb-2 w-full px-5 pt-5 text-center text-[11px] leading-relaxed text-gray-500 sm:text-[12px]">
        <span>
          Built by{' '}
          <a
            aria-label="제작자의 깃허브로 방문 (새 창)"
            href="https://github.com/pyeonh8/explorer-ui-kit"
            target="_blank"
            rel="noreferrer"
            className="font-bold underline decoration-dotted hover:text-(--color-accent)"
          >
            @pyeonh8
          </a>
        </span>
        <div className="flex flex-wrap justify-center gap-x-1.5">
          <span className="opacity-80">Data from AmiiboAPI & Nookipedia</span>
          <span aria-hidden="true" className="hidden opacity-40 sm:inline">
            |
          </span>
          <span className="opacity-80">
            Animal Crossing is a trademark of Nintendo.
          </span>
        </div>
        <p className="mt-1 opacity-50">© 2026 탐험해요 뽀모도로 타이머.</p>
      </footer>
    </div>
  );
}
