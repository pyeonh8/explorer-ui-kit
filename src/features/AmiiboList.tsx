'use client';

import { useState } from 'react';

import useAmiibos from '@/shared/hooks/useAmiibos';
import AmiiboItem from './AmiiboCard';

const AmiiboList = () => {
  const [selected, setSelectedId] = useState<string[]>([]);

  const handleSelectAmiibo = (amiibo: string, toggle: boolean) => {
    console.log(toggle);
    if (!toggle) return setSelectedId((prev) => [...prev, amiibo]);
    if (toggle)
      return setSelectedId((prev) => prev.filter((item) => item !== amiibo));
  };

  console.log(selected);

  const { finalAmiibo, isLoading, error } = useAmiibos();

  if (isLoading) return <div> 로딩 중. . . </div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid w-[600px] grid-cols-4 gap-3">
      {finalAmiibo.slice(0, 20).map((amiibo) => (
        <AmiiboItem
          key={amiibo.head + amiibo.tail}
          amiibo={amiibo}
          onSelect={handleSelectAmiibo}
        />
      ))}
    </div>
  );
};

export default AmiiboList;
