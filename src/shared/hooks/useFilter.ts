import { useMemo, useState } from 'react';

/**
 * 데이터를 필터링하는 범용 커스텀 훅
 * * @template T - 배열 요소의 타입
 * @param {T[]} initialData - 필터링할 원본 데이터 배열
 * @param {keyof T} filterKey - 필터링의 기준이 될 객체의 키
 *
 * @returns {T[]} returns.filteredData - 필터링이 완료된 데이터 배열
 * @returns {string} returns.filterValue - 현재 적용된 필터 값 (기본값: 'All')
 * @returns {function} returns.setFilterValue - 필터 값을 변경하는 함수
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

  return { filteredData, filterValue, setFilterValue };
};

export default useFilter;
