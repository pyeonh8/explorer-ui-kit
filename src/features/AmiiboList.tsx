'use Client';

import Image from 'next/image';
import kRkoVillagers from '@/shared/utils/kRkoVillagers';
import useAmiibos from '@/shared/hooks/useAmiibos';

const AmiiboList = () => {
  const { finalAmiibo, isLoading, error } = useAmiibos();

  // 로딩 & 에러 처리
  if (isLoading) return <div> 로딩 중. . . </div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-4 gap-3">
      {finalAmiibo.map((amiibo) => (
        <div key={amiibo.head + amiibo.tail}>
          <div className="overflow- relative aspect-[69/97] w-full rounded-[5px] bg-[var(--color-secondary)]">
            <Image
              src={amiibo.image}
              alt={amiibo.character}
              fill={true}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain"
            />
          </div>
          <div className="text-center font-bold">
            {/* {amiibo.character} */}
            {kRkoVillagers(amiibo.character)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AmiiboList;
