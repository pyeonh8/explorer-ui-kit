/**
 * 저장된 로컬 스토리지 불러오는 유틸
 */
const getSavedStorageIds = (storageName: string): string[] => {
  if (typeof window === 'undefined') return [];

  const data = localStorage.getItem(storageName);

  return data ? JSON.parse(data) : [];
};

export default getSavedStorageIds;
