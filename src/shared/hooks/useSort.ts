import { sortConfigProps } from '@/types/hooks.types';
import { useMemo, useState } from 'react';

/**
 * 데이터를 정렬하고 상태를 관리하는 범용 커스텀 훅
 * * @template T - 배열 요소의 타입
 * @param {T[]} initialData - 정렬 대상이 되는 원본 데이터 배열
 * @param {Object} defaultConfig - 초기 정렬 설정
 * @param {keyof T | null} defaultConfig.key - 초기 정렬 기준이 될 키 (null일 경우 정렬 안함)
 * @param {'asc' | 'desc'} defaultConfig.direction - 초기 정렬 방향 ('asc': 오름차순, 'desc': 내림차순)
 *
 * @returns {T[]} returns.sortedData - 정렬 로직이 적용된 결과 데이터 배열
 * @returns {(key: keyof T) => void} returns.requestSort - 특정 키를 기준으로 정렬을 요청하는 함수
 * @returns {Object} returns.sortConfig - 현재 적용된 정렬 상태 (key, direction)
 */
const useSort = <T>(
  initialData: T[],
  defaultConfig: { key: keyof T; direction: 'asc' | 'desc' }
) => {
  const [sortConfig, setSortConfig] =
    useState<sortConfigProps<T>>(defaultConfig);

  const sortedData = useMemo(() => {
    // 원본 본사본
    const items = [...initialData];

    if (sortConfig.key) {
      items.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        // 문자열 정렬
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue, 'ko')
            : bValue.localeCompare(aValue, 'ko');
        }

        // 숫자나 기타 값 정렬
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue < aValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [initialData, sortConfig]);

  // 버튼 클릭 시 호출할 정렬 요청
  const requestSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return { sortedData, requestSort, sortConfig };
};

export default useSort;
