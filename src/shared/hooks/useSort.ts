import { sortConfigProps } from '@/types/hooks.types';
import { useMemo, useState } from 'react';

// 정렬
const useSort = <T>(
  initialData: T[],
  defaultConfig: { key: keyof T; direction: 'asc' | 'desc' }
) => {
  const [sortConfig, setSortConfig] =
    useState<sortConfigProps<T>>(defaultConfig);

  const sortedData = useMemo(() => {
    const items = [...initialData];

    if (sortConfig.key) {
      items.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue, 'ko')
            : bValue.localeCompare(aValue, 'ko');
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue < aValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [initialData, sortConfig]);

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
