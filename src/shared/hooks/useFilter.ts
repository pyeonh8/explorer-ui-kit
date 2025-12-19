import { useMemo, useState } from 'react';

/**
 *
 */
const useFilter = <T>(initialData: T[], filterKey: keyof T) => {
  const [filterValue, setFilterValue] = useState('All');

  // 필터링된 결과
  const filteredData = useMemo(() => {
    if (filterValue === 'All') return initialData;

    return initialData.filter((item) => {
      // 데이터의 특정 키와 현재 선택한 값이 같은지 확인
      return String(item[filterKey]) === filterValue;
    });
  }, [initialData, filterValue, filterKey]);

  // 필터 옵션 추출
  const options = useMemo(() => {
    const values = initialData.map((item) => String(item[filterKey]));
    return ['All', ...new Set(values)];
  }, [filterKey, initialData]);

  return { filteredData, options, filterValue, setFilterValue };
};

export default useFilter;
